const { validationResult } = require('express-validator');
const { UNAUTHENTICATED } = require('../../constants');
module.exports = {
    validateErrors : (req, res, next) => {
        try {
            const errors = validationResult(req);
            if(errors.isEmpty()) {
                return next();
                
            }
            let extractedErrors = "";
            errors.array().map(err => {
                console.log(err)
                if(err.msg === "Invalid value")
                    extractedErrors += `${err.param} has ${err.msg}. `;
                else 
                    extractedErrors += `${err.msg} `;
            });
            if(extractedErrors.split(/\s/).includes(UNAUTHENTICATED))
                return res.status(401).send({status: false,message: UNAUTHENTICATED});
            else
                return res.status(400).send({status: false,message: extractedErrors});
        }catch(error) {
            return res.status(400).send({status: false,message: extractedErrors});
        }
    }
}