
exports.logout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('Could not log out, please try again.');
      } else {
        res.clearCookie('connect.sid'); 
        res.redirect('/login'); 
      }
    });
  };
  
  