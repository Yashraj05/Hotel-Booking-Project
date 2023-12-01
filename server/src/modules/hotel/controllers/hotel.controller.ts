import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { HotelSchema } from '../schema/hotel.schema';
import { User } from 'src/core/Interface/user.interface';
import dotenv from 'dotenv'
import { userModel } from 'src/modules/auth/schema/model';

dotenv.config();

export const createHotel = async (req: Request, res: Response) => {
    const user = req.user as User;
    if(user.role != 'merchant'){
        return res.status(401).send('UnAuthorized User');
    }
    const [hotel_name , hotel_description , media_files] = req.body;
    let userid = user.userid;
    let hotel = await userModel.create({
        hotel_name ,
        hotel_description ,
        media_files ,
    });
    hotel.save();
    res.status(200).send({
        hotel : hotel,
        msg : "Hotel Created Successfully" 
    })
}

/*
    export const createHotel = async (req: Request, res: Response) => {
    // Check if req.user is defined before accessing its properties
    if (req.user && req.user.role) {
        console.log(req.user.role);
        console.log("I am Hit");
        res.status(200).send("createHotel");
    } else {
        // Handle the case where req.user or req.user.role is undefined
        res.status(401).send("Unauthorized");
    }
};

*/
export const findHotel = async (req: Request, res: Response) => {
    res.status(200).send("findHotel")
}

export const findHotelById = async (req: Request, res: Response) => {
    res.status(200).send("findHotelHotel")
}

/*
Hello Sir , I am working on a Hotel Room Booking System with Yashraj and We have already design a Schema and Facebook and Google Login are Integrated . Currently I am working on Hotel Rest Apis and razorpay pay Implemntation .
Tech stack is Reactjs and Expressjs and  And it will ve completed within 2 weeks from now.





*/