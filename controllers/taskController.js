
const constants = require('../constants');
const db = require('../models');
let result = {};
const addTask = async(req, res, next) => {
    try {
        const { taskName, taskDescription, isActive, projectId } = req.body;
        await db.Task.create({
            taskName,
            taskDescription,
            isActive,
            projectId,
            createdById: req.userId,
            updatedById: req.userId
        })
        result = {
            status: true,
            message:  constants.TASK_ADDED_SUCC_MSG
        }
        res.status(201).send(result);
    }catch(error) {
        console.error(error)
        next(error);
    }
}

const updateTask = async(req, res, next) => {
    try {
        const { taskName, taskDescription, isActive, projectId, taskId } = req.body;
        await db.Task.update({
            taskName,
            taskDescription,
            isActive,
            projectId,
            createdById: req.userId,
        }, {where: {
            id: taskId
        }})
        result = {
            status: true,
            message:  constants.TASK_UPDATED_SUCC_MSG
        }
        res.status(200).send(result); 
    }catch(error) {
        console.error(error)
        next(error);
    }
}

const addTaskLog = async(req, res, next) => {
    try {
        const { projectId, taskId, comment, timeSpent } = req.body;
        await db.TaskLog.create({
            projectId,
            taskId,
            comment,
            timeSpent,
            createdById: req.userId,
            updatedById: req.userId
        })
        result = {
            status: true,
            message:  constants.TASK_UPDATED_SUCC_MSG
        }
        res.status(200).send(result);
        res.send(req.user); 
    }catch(error) {
        console.error(error)
        next(error);
    }
}
const getAllTasks = async(req, res, next) => {
    try {
        
        const tasks = await db.Task.findAll({ where: {createdById: req.userId}, 
            include: [
                { model: db.User, attributes: ['userName']},
                {model: db.Project, attributes: ['projectName']}
        ] });
        res.send(tasks);
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    addTask,
    updateTask,
    addTaskLog,
    getAllTasks
}