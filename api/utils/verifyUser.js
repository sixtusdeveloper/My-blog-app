import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyUser = (req, res, next) => { 
   const token = req.cookies.access_token; // verifyUser function to verify a user

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }   // if there is no token, return an error

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }   // if there is an error, return an error

        req.user = user;
        next();
    });  // if there is no error, set the user and call the next middleware
}   