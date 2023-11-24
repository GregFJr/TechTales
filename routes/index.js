const router = require('express').Router();

// const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const homeRoutes = require('./homeRoutes');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const dashboardRoutes = require('./dashBoardRoutes');
const logoutRoutes = require('./logoutRoutes');

router.use('/', homeRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/post', postRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/signup', signupRoutes);

module.exports = router;
