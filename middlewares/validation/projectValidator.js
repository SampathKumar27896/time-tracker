const { body, param } = require('express-validator');
const constants = require('../../constants');

const addProjectValidationRules = () => {
    return [
        body('projectName').isLength({ min: constants.MIN_PROJECTNAME_LENGTH }).withMessage(constants.PROJECTNAME_LENGTH_MSG),
        body('projectDescription').isLength({ min: constants.MIN_PROJDESC_LENGTH }).withMessage(constants.PROJDESC_LENGTH_MSG),
        body('isActive').isBoolean(),
    ]
}
const editProjectValidationRules = () => {
    return [
        param('projectId').isInt()
    ]
}
const updateProjectValidationRules = () => {
    return [
        body('projectName').isLength({ min: constants.MIN_PROJECTNAME_LENGTH }).withMessage(constants.PROJECTNAME_LENGTH_MSG),
        body('projectDescription').isLength({ min: constants.MIN_PROJDESC_LENGTH }).withMessage(constants.PROJDESC_LENGTH_MSG),
        body('isActive').isBoolean(),
        body('projectId').isInt()
    ]
}




module.exports = {
    addProjectValidationRules,
    updateProjectValidationRules,
    editProjectValidationRules
}