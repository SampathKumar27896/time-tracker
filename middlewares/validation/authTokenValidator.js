const { header } = require('express-validator');
const jwt = require('jsonwebtoken');
const constants = require('../../constants');
require('dotenv').config()
const { JWT_SECRET }  = process.env;

const verifyAuthToken = (req, res, next) => {

    return [
        header('token').custom((value, {req, res}) => {
            try {
                const token = value.split(" ")[1];
                const {userId, email} = jwt.verify(token, JWT_SECRET);
                req.userId = userId;
                req.email = email;
                return true;
            } catch(error) {
                throw new Error(error);
            } 
        })
    ]
    
}



module.exports = {
    verifyAuthToken,
}