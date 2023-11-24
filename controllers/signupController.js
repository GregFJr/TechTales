const { User } = require("../models");

exports.signupPage = async (req, res) => {
    try {
      const userData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
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