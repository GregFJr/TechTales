const { Post, User } = require('../models');

exports.renderDashboard = async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.user_id
            },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', { 
            posts, 
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

exports.renderAddPost = (req, res) => {
    res.render('add-post', {
        loggedIn: req.session.loggedIn
    });
};

exports.createPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.user_id
        });
        
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};
