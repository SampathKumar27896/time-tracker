const { validationResult } = require('express-validator');
module.exports = {
    validateErrors : (req, res, next) => {
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
        return res.status(422).send({status: false,message: extractedErrors});
    }
}