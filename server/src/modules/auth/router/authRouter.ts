import express from 'express';
// import {signup}  from '../controllers/authController';
import { signin, signup } from '../controllers/authController';
import passport from 'passport';

export const auth_router = express.Router();
// For Auth
auth_router.post('/signup' , signup);
auth_router.post('/signin' , signin);
auth_router.get('/', (req, res) => {
    res.send("<button><a href='/auth/google'>Login With Google</a></button>")
});
  
// Auth Callback
auth_router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/callback/success',
        failureRedirect: '/auth/google/callback/failure' // Add failure redirect route
    })
);
  
// Success 
auth_router.get('/auth/google/callback/success', (req, res) => {
    if (!req.user) {
        res.redirect('/auth/google/callback/failure');
    } else {
        res.send("Welcome");
    }
});

// Failure
auth_router.get('/auth/google/callback/failure', (req, res) => {
    res.send('Authentication failed'); // Add custom message or redirect logic for failure
});

// module.exports = auth_router;
// export default auth_router;