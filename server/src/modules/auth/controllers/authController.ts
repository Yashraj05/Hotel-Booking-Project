import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { userModel } from '../schema/model';
import dotenv from 'dotenv'
dotenv.config();
import passport from "passport";
import strategy from "passport-facebook";

const generateRandomPassword=()=>{
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]};:<>|,./?';
    let password = '';
    for (let i = 0; i < 6; i++) { 
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
}


const FacebookStrategy = strategy.Strategy;
import { UserFcmTokenModel } from '../schema/userFcmToken.entity';

export const signup = async (req: Request, res: Response) => {
    if (!req.body.userName || !req.body.email || !req.body.password || !req.body.role) {
        return res.status(400).send(`Please enter email and password`);
    }

    let alreadyUser = await userModel.findOne({ email: req.body.email });
    console.log(alreadyUser)
    if (alreadyUser) {
        return res.status(500).send(`User Already Exists`);
    }

    let hashPassword = await bcrypt.hash(req.body.password, 10).catch(err => console.log(err));
    const user = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
    })
    user.save().then((result) => {
        return res.status(201).send(`User Registed Successfully`);
    }).catch((err) => {
        return res.status(400).send(err);
    });
}

export const signin = async (req: Request, res: Response) => {
    if (!req.body.password || !req.body.email) {
        return res.status(505).send("Please Enter Users Details")
    }
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({ message: `User Not Found` });
    }
    let password = await bcrypt.compare(req.body.password , user.password || '');
    if(!password){
        return res.status(400).send({message : "Invalid Password"});
    }
    if (req.body.fcmToken) {
        const query = { userId: user._id }; // Define the query based on user ID
        const update = { $set: { fcmToken: req.body.fcmToken } }; // Update the fcmToken field

        // Use updateOne with upsert option set to true
        const res = await UserFcmTokenModel.updateOne(query, update, { upsert: true });
        console.log(res);
    }

    const token = jwt.sign(
        { userid: user._id, email: user.email, role: user.role },
        process.env.SECRET_CODE || "MI6",
        { expiresIn: "24h" },
    )
    return res.status(201).send({ token: token });
}

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj || null);
  });

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.APP_ID || '',
        clientSecret: process.env.APP_SECRET || '',
        callbackURL: process.env.FACEBOOK_CALLBACK_URL || '',
        profileFields: ["email", "name"]
      },

      async function(accessToken, refreshToken, profile : any, done) {
        const password = generateRandomPassword();
        const { first_name, last_name ,id} = profile._json;

        const user = await userModel.findOne({facebookId : id}).exec();
        console.log(user);
        if(user){
            done(null , user);
            return "";
        }
        const userData = {
          userName : first_name,
          password : password,
          email : `${first_name+last_name+password}@gmail.com`,
          facebookId : id
        };
        new userModel(userData).save()
          .then((user) => {
            console.log("Login Successfully")
            done(null , user)
        })
          .catch((error) =>{ console.log(error)
            done(null , error)
        });
      }
    )
  );