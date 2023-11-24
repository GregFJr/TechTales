const router = require('express').Router();
const withAuth = require('../utils/auth');
const postController = require('../controllers/postController');

router.get('/post-id/:id', postController.getPostById);  

router.post('/create-post', withAuth, postController.createPost);

router.put('/update/:id', withAuth, postController.updatePost);

router.delete('/delete/:id', withAuth, postController.deletePost);

module.exports = router;
