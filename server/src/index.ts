import express from 'express';
import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose'
import {auth_router} from './modules/auth/router/authRouter';

dotenv.config();
const conn:Promise<Mongoose> =  mongoose.connect(process.env.MONGO_URL || "");

console.log(`MongoDB Connected`);

const app = express();
app.use(express.json());
app.use('/' , auth_router);

const Port = process.env.PORT || 5000;
console.log(Port)
const server = app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });