const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const constants = require('../../constants');

const registerUserValidationRules = () => {
    return [
        body('userName').isLength({ min: constants.MIN_USERNAME_LENGTH }).withMessage(constants.USERNAME_LENGTH_MSG),
        body('email').isEmail().trim().escape().normalizeEmail().withMessage(constants.INVALID_EMAIL_MSG),
        body('password').isLength({ min: constants.MIN_PASSWORD_LENGTH }).withMessage(constants.PASSWORD_LENGTH_MSG),
        body('confirmPassword').custom((value, {req}) => {
            if(value !== req.body.password)
                throw new Error(constants.CONFIRM_PASSWORD_MSG);
            return true;
        })
    ]
}
const loginUserValidationRules = () => {
    return [
        body('email'),
        body('password')
    ]
}



module.exports = {
    registerUserValidationRules,
    loginUserValidationRules
}