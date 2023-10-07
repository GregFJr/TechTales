const router = require('express').Router();

const userRoutes = require('./userRoutes');
const projectRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/post', projectRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
