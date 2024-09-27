import { errorHandler } from "../utils/error.js"
import { Post } from '../models/post.model.js'

export const create = async (req, res, next) => {
    if(!req.body.isAdmin){
        return next(errorHandler('You are not allowed to create a post', 403));
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler('Title and content are required', 400));   
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');

    const newPost = new Post({
        ...req.body, 
        slug, 
        userId: req.user.id
    });

    try {
        const savedPost = await newPost.save()
        res.status(201).json(savedPost)
        
    } catch (error) {
        next(error);
    }
}