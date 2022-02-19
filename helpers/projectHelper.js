const constants = require('../constants');
const db = require('../models');

const getProjectById = async(id, userId) => {
    try {
        const project = await db.Project.findOne({
            where: { id: id, createdById: userId},
            attributes: [['id','projectId'], 'projectName', 'projectDescription','isActive']
        })
        if(project)
            return project;
        else 
            throw new Error(constants.PROJECT_NOT_EXIST_MSG);
    }catch(error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    getProjectById,
}