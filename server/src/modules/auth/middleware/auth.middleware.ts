import { Request , Response , NextFunction } from "express"
import jwt from 'jsonwebtoken';
import { User } from "src/core/Interface/user.interface";

export const authenticateUser = (req:Request,res:Response,next:NextFunction)=>{


    const authHeader = req.headers.authorization;
    if(authHeader ){
        // compare secret code
        const token = authHeader.split(' ')[1];
        jwt.verify(token , process.env.SECRET_CODE || 'MI6' , (err, user : User | string | jwt.JwtPayload | undefined )=>{
            if(err){
                console.log(err);
                return res.send(err);
            }
            else {
                if (typeof user === 'object' && 'role' in user) {
                    // Access the user role
    
                    req.user = user;
                    next();
                } else {
                    // If there is Invalid user object.
                    console.error('Invalid user object');
                    return res.status(401).send('Unauthorized');
                }
            }
        })
    }
    else{
        res.send({
            status : 404,
            message : "Invalid Authorization"
        })
    }
}

/*
    import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface User {
    user: object;
    userid: string;
    role: string;
    iat: number;
    exp: number;
}

const authHeader = req.headers.authorization;

if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.SECRET_CODE || 'MI6', (err, user: User | string | jwt.JwtPayload | undefined) => {
        if (err) {
            console.error(err);
            return res.status(401).send('Unauthorized');
        } else {
            if (typeof user === 'object' && 'role' in user) {
                // Access the user role
                const userRole = user.role;
                console.log('User Role:', userRole);

                req.user = user as User;
                next();
            } else {
                console.error('Invalid user object');
                return res.status(401).send('Unauthorized');
            }
        }
    });
} else {
    return res.status(401).send('Unauthorized');
}


*/