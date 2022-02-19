
const constants = require('../constants');
const projectHelper = require('../helpers/projectHelper');
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
const editProject = async(req, res, next) => {
    try {
        const { projectId } = req.params;
        const project = await projectHelper.getProjectById(projectId, req.userId);
        result = {
            status: true,
            project
        }
        res.status(200).send(result);
    }catch(error) {
        console.error(error)
        next(error);
    }
}
const updateProject = async(req, res, next) => {
    try {
        const { projectName, projectDescription, isActive, projectId } = req.body;
        const project = await projectHelper.getProjectById(projectId, req.userId);
        // if(project)
        //     throw new Error(constants.PROJECT_EXISTS_MSG);
        // else {
            await db.Project.update({
                projectName,
                projectDescription,
                isActive,
                updatedById: req.userId
            }, {where: {
                id: projectId
            },individualHooks: true})
            result = {
                status: true,
                message:  constants.PROJECT_UPDATED_SUCC_MSG
            }
            res.status(200).send(result);
        // }
        
    }catch(error) {
        console.error("heeee",error)
        next(error);
    }
}

const getAllProjects = async(req, res, next) => {
    try {
        let  {offset, isActive} = req.query;
        let whereCondition = {
            createdById: req.userId,
            isActive: isActive
        };
        const {rows, count} = await db.Project.findAndCountAll({ 
                where: whereCondition, 
                attributes: ['id', ['projectName', 'name'], ['projectDescription', "description"]],
                limit: 5,
                offset: Number(offset),
                include: [{ model: db.User, attributes: ['userName']}], 
            });
        let page = 1;
        let limit =  5;    
        const totalPages = Math.ceil(count/ limit);
        console.log(rows)
        res.status(200).send({status: true, projects: rows, count: count, totalPages, page});
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    addProject,
    editProject,
    updateProject,
    getAllProjects
}