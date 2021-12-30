const routes = require('express').Router();
const userValidator  = require('../middlewares/validation/userValidator');
const validateErrors = require('../middlewares/validation/validateErrors').validateErrors;
const userController = require('../controllers/userController');

routes.post('/register', userValidator.registerUserValidationRules(), validateErrors, userController.registerUser);
routes.post('/login',    userValidator.loginUserValidationRules(), validateErrors, userController.loginUser);
module.exports = routes; 