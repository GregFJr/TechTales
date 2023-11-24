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

exports.renderAddForm = (req, res) => {
    res.render('add-post', {
        loggedIn: req.session.loggedIn
    });
};

exports.renderUpdateForm = async (req, res) => {
    try {
        
        const postData = await Post.findOne({
            where: {
                id: req.params.id, 
                userId: req.session.user_id, 
            },
        });

        if (!postData) {
        
            res.status(404).send('Post not found');
            return;
        }

        res.render('update-post', {
            loggedIn: req.session.logged_in,
            post: postData.get({ plain: true }) 
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error retrieving the post');
    }
};


