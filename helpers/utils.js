const jwt = require('jsonwebtoken');
const constants = require('../constants');
require('dotenv').config()
const bcrypt = require('bcryptjs');
const { JWT_SECRET }  = process.env;
const generateJWTToken = (user) => {
    try {
        return  jwt.sign(
            {userId: user.id, email: user.email},
            JWT_SECRET,
            {
                expiresIn: constants.JWT_EXPIRE_TIME,
            }
        )
    }catch(error) {
        throw new Error(error);
    } 
}

const generatePasswordHash = async(password) => {
    try {
        return await bcrypt.hash(password, constants.PASSWORD_SALT_ROUND);
    }catch(error) {
        throw new Error(error);
    }
}

const verifyPassword = async(password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    }catch(error) {
        throw new Error(error);
    }
}
module.exports = {
    generateJWTToken,
    generatePasswordHash,
    verifyPassword
}