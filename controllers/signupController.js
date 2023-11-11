const { User } = require("../models");

exports.signupPage = async (req, res) => {
    try {
      const userData = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      });

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        res.redirect('/dashboard');
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };