import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { userModel } from '../schema/model';
import dotenv from 'dotenv'
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
    let password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
        return res.status(400).send({ message: "Invalid Password" });
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