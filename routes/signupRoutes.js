const router = require('express').Router();
const signupController = require('../controllers/signupController');

router.get('/', async (req, res) => {
    res.render('signup');
});

router.post('/authenticate', signupController.signupPage);

module.exports = router;