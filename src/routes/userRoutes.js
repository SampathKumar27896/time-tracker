const router = require('express').Router();
const userController = require('../controllers/userController');
router.post('/registerUser', userController.registerUser);
router.post('/loginUser', userController.loginUser);
module.exports = router;