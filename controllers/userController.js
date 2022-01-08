
const constants = require('../constants');
const db = require('../models');
const utils = require('../helpers/utils');
let result = {};
const registerUser = async(req, res, next) => {
    try {
        // const { userName, email, password } = req.body;
        // await db.User.create({
        //     userName,
        //     email,
        //     isActive: true,
        //     password
        // })
        result = {
            status: true,
            message:  constants.USER_REG_SUCC_MSG
        }
        res.status(201).send(result);
    }catch(error) {
        console.error(error)
        next(error);
    }
}

const loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExists = await db.User.findOne({ where: {email: email }});
        if(userExists) {
            const isPasswordMatch = await utils.verifyPassword(password, userExists.password);
            if(!isPasswordMatch)
                throw new Error(constants.INVALID_CRED_MSG);
            const token = utils.generateJWTToken(userExists);
            result = {
                userId: userExists.id,
                userName: userExists.userName,
                email: userExists.email,
                token, 
                status: true,
                message:  constants.USER_LOGIN_SUCC_MSG
            }
            res.status(200).send(result);
        } else 
            throw new Error(constants.INVALID_CRED_MSG)
        
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser
}