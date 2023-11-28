import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request , Response } from 'express';
import { userModel } from '../schema/model';

export const signup= async(req : Request,res : Response)=>{
    // if(!req.body.email || !req.body.password){
    //     return res.status(400).send( `Please enter email and password`);
    // }

    // let alreadyUser = await User.findOne({email : req.body.email});
    // if(alreadyUser ){
    //     return res.status(500).send(`User Already Exists`);
    // }

    // let hashPassword = await bcrypt.hash(req.body.password , 10).catch(err => console.log(err));
    // const user = new User({
    //     email : req.body.email,
    //     password : hashPassword
    // })
    // user.save().then((result)=>{
    //     return res.status(201).send(`User Registed`);
    // }).catch((err)=>{
    //     return res.status(400).send(err);
    // })
    res.status(200).send("Hello World");
}