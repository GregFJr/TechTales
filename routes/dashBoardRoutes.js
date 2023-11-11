const router = require('express').Router();
const withAuth = require('../utils/auth');
const dashBoardController = require('../controllers/dashboardController');

// router.get('/', dashBoardController.getDashboard);

router.get('/', withAuth, dashBoardController.renderDashboard);

router.get('/add-post', withAuth, dashBoardController.renderAddPost);

router.post('/add-post', dashBoardController.createPost);



module.exports = router;
