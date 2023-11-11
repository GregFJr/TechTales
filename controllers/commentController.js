const { Comment } = require("../models");

exports.commentPage = async (req, res) => {
    try {
        if (!req.session.userId) {
            res.status(401).json({ message: 'Please log in to comment.' });
            return;
        }

        const newComment = await Comment.create({
            content: req.body.content,
            post_id: req.body.postId,
            user_id: req.session.userId
        });

        res.json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}; 

exports.addComment = async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.commentText,
            userId: req.session.userId,
            postId: req.body.postId
        });

        res.redirect('/post/' + req.body.postId);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};