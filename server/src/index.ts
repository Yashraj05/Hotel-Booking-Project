import 'reflect-metadata';
import express, { Request } from 'express';
import dotenv from 'dotenv';
import session from "express-session";
import passport from "passport";
import mongoose, { Mongoose } from 'mongoose'
import cors from 'cors';
import {auth_router} from './modules/auth/router/authRouter';
import { Strategy as GoogleStrategy, VerifyCallback} from 'passport-google-oauth2';
import Container from 'typedi';
import { UserService } from './modules/auth/service/service';
import firebaseInitialize from './core/provider/firebaseProvider';

dotenv.config();
const conn:Promise<Mongoose> =  mongoose.connect(process.env.MONGO_URL || "");

console.log(`MongoDB Connected`);
const googleUserServiceInstance = Container.get(UserService);

async function runFirebase() { 
  await firebaseInitialize(); 
}
runFirebase()

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Include credentials like cookies, authorization headers, etc.
}));
app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport.use(Employee.createStrategy());

// passport.serializeUser(Employee.serializeUser());
// passport.deserializeUser(Employee.deserializeUser());

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
console.log(clientID);

if (!clientID || !clientSecret) {
  throw new Error('Google OAuth clientID or clientSecret is not defined');
}

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback:true
    },
    (req: Request,accessToken: string, refreshToken: string, profile: any, done:VerifyCallback) => {
      //console.log(profile);
      const state = req.query.state
      console.log("fcm token",state);
      console.log("acess",accessToken);
      console.log("refresh",refreshToken);
      googleUserServiceInstance.serializeUser(profile, done);
    }
  )
);


passport.serializeUser(googleUserServiceInstance.serializeUser);
passport.deserializeUser(googleUserServiceInstance.deserializeUser);
app.use('/' , auth_router);

const Port = process.env.PORT || 5000;
console.log(Port)
const server = app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });