const router = require('express').Router();
const commentController =  require('../controllers/commentController');

router.post('/', commentController.commentPage);

router.post('/addComment', commentController.addComment);

module.exports = router;
