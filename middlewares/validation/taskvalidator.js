const { body } = require('express-validator');
const constants = require('../../constants');

const addTaskValidationRules = () => {
    return [
        body('taskName').isLength({ min: constants.MIN_TASKNAME_LENGTH }).withMessage(constants.TASKNAME_LENGTH_MSG),
        body('taskDescription').isLength({ min: constants.MIN_TASKDESC_LENGTH }).withMessage(constants.TASKDESC_LENGTH_MSG),
        body('isActive').isBoolean(),
        body('projectId').isInt()
    ]
}

const updateTaskValidationRules = () => {
    return [
        body('taskName').isLength({ min: constants.MIN_TASKNAME_LENGTH }).withMessage(constants.TASKNAME_LENGTH_MSG),
        body('taskDescription').isLength({ min: constants.MIN_TASKDESC_LENGTH }).withMessage(constants.TASKDESC_LENGTH_MSG),
        body('isActive').isBoolean(),
        body('projectId').isInt(),
        body('taskId').isInt()
    ]
}

const addTaskLogValidator = () => {
    return [
        body('projectId').isInt(),
        body('taskId').isInt(),
        body('comment').isLength({ min: constants.MIN_TASKCOMMENT_LENGTH }).withMessage(constants.TASKCOMMENT_LENGTH_MSG),
        body('timeSpent').isString()
    ]
}




module.exports = {
    addTaskValidationRules,
    updateTaskValidationRules,
    addTaskLogValidator
}