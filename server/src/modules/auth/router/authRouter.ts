import express from 'express';
import { Request , Response } from 'express';
import passport from 'passport';
import axios from 'axios';
import { signup , signin } from '../controllers/authController';
import { userModel } from '../schema/model';

export const auth_router = express.Router();
// For Auth
auth_router.post('/signup' , signup);
auth_router.post('/signin' , signin);
auth_router.get('/google/login', (req, res) => {
    res.send("<button><a href='/auth/google'>Login With Google</a></button>")
});

auth_router.get('/facebook/login', (req, res) => {
    res.send("<button><a href='/auth/facebook'>Login With Facebook</a></button>")
});

//----------------------------------------------------------------------------
// Google Auth

auth_router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

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

// Facebook Auth

auth_router.get("/auth/facebook", passport.authenticate("facebook"));
auth_router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

auth_router.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

auth_router.get("/", (req, res) => {
  res.send("Success"
  );
});


