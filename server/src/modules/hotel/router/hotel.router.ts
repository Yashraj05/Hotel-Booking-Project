import express from 'express';
import { Request , Response } from 'express';
import passport from 'passport';
import axios from 'axios';
import { createHotel, findHotel, findHotelById } from '../controllers/hotel.controller';
import { authenticateUser } from '../../auth/middleware/auth.middleware';
// import {authenticateUser}  from 'src/modules/auth/middleware/auth.middleware';

// import { signup , signin } from '../controllers/authController';
// import { userModel } from '../schema/model';

export const hotel_router = express.Router();
// For Auth

// For Merchant
hotel_router.post('/createHotel' ,authenticateUser , createHotel);

// For User
hotel_router.get('/getAllHotel' , findHotel);
hotel_router.get('/getHotel:id' , findHotelById);

