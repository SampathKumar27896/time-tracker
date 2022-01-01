
const constants = require('../constants');
const db = require('../models');
let result = {};
const addProject = async(req, res, next) => {
    try {
        const { projectName, projectDescription, isActive } = req.body;
        console.log(req.user, projectName, projectDescription, isActive);
        await db.Project.create({
            projectName,
            projectDescription,
            isActive,
            createdById: req.userId,
            updatedById: req.userId
        })
        result = {
            status: true,
            message:  constants.PROJECT_ADDED_SUCC_MSG
        }
        res.status(201).send(result);
    }catch(error) {
        console.error(error)
        next(error);
    }
}

const updateProject = async(req, res, next) => {
    try {
        const { projectName, projectDescription, isActive, projectId } = req.body;
        await db.Project.update({
            projectName,
            projectDescription,
            isActive,
            updatedById: req.userId
        }, {where: {
            id: projectId
        }})
        result = {
            status: true,
            message:  constants.PROJECT_UPDATED_SUCC_MSG
        }
        res.status(200).send(result);
    }catch(error) {
        console.error(error)
        next(error);
    }
}

const getAllProjects = async(req, res, next) => {
    try {
        const {userId} = req.query;
        const projects = await db.Project.findAll({ where: {createdById: userId}, include: [{ model: db.User, attributes: ['userName']}] });
        res.send(projects);
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    addProject,
    updateProject,
    getAllProjects
}