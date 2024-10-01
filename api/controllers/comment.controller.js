import Comment from '../models/comment.model.js';

export const createComment = async (req, res) => {
    const { postId, userId, content } = req.body;
    try {
        const { postId, userId, content } = req.body;
        
        if (userId !== req.user.id) {
            return next(errorHandler(403, 'Unauthorized'))
        }

        const newComment = new Comment({
            postId,
            userId,
            content
        });
        await newComment.save();

        res.status(200).json(newComment);

    } catch (error) {
        next(error);
    }
};