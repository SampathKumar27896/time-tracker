const { header } = require('express-validator');
const jwt = require('jsonwebtoken');
const constants = require('../../constants');
require('dotenv').config()
const { JWT_SECRET }  = process.env;

const verifyAuthToken = () => {

    return [
        header('token').custom((value, {req, res}) => {
            try {
                const token = value.split(" ")[1];
                const {userId, email} = jwt.verify(token, JWT_SECRET);
                req.userId = userId;
                req.email = email;
                return true;
            } catch(error) {
                console.log(error)
                const err = new Error(constants.UNAUTHENTICATED);
                err.code = 401;
                throw err;
            } 
        })
    ]
    
}



module.exports = {
    verifyAuthToken,
}