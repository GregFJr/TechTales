const router = require('express').Router();
const withAuth = require('../utils/auth');
const postController = require('../controllers/postController');

router.get('/post-id/:id', postController.getPostById);  

router.get('/add-post', postController.getAddPostForm);

router.post('/create-post', postController.createPost);

router.post('/', withAuth, postController.createPost);

router.put('/:id', withAuth, postController.updatePost);

router.delete('/delete/:id', withAuth, postController.deletePost);

module.exports = router;
