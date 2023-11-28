import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
dotenv.config();

const app = express();
app.use(express.json());

const conn = await mongoose.connect(process.env.MONGO_URL,);
console.log(`MongoDB Connected`);

const Port = process.env.PORT || 5000;
const server = app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
  });