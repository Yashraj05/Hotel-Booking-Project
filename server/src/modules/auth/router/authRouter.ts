import express from 'express';
// import {signup}  from '../controllers/authController';
import { signin, signup } from '../controllers/authController';

export const auth_router = express.Router();
// For Auth
auth_router.post('/signup' , signup);
auth_router.post('/signin' , signin);

// module.exports = auth_router;
// export default auth_router;