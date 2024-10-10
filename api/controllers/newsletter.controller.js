import { errorHandler } from '../utils/error.js';  // Import the errorHandler function  
import Newsletter from '../models/newsletter.model.js';  // Import the Newsletter model

import crypto from 'crypto';

export const newsletter = async (req, res, next) => {
    const { email } = req.body;

    try {
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return next(errorHandler(400, 'Email already subscribed'));
        }

        const token = crypto.randomBytes(32).toString('hex'); // Generate token

        const newSubscription = new Newsletter({ email, token });
        await newSubscription.save();
        
        res.json('Subscribed to newsletter successfully');
    } catch (error) {
        next(error);
    }
};

