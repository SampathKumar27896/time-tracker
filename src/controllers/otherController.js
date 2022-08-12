const {Project} = require('../mongoSchemas/schema');
const {paginator} = require('../helpers/utilityFuncitons');

const addProject = (req, res) => {
        try {
                const { userId, projectName, description, isActive, userName} = req.body;
                const project = new Project({userId: userId, name: projectName, 
                        description: description, isActive: isActive, createdBy: userName, updatedBy: userName})
                project.save();
                res.status(201).send({status: true, message: "Project successfully added"});
        } catch(error) {
                console.error(error);
                throw error;
        }
}
const getProject = async(req, res) => {
        try {
                let page = parseInt(req.query.page) || 0;
                let conditions = { isActive: true, userId: req.body.userId };
                if(req.query.projectId) {
                        conditions['_id'] = req.query.projectId;
                }
                let selectFields = ["name", "description", "isActive"];
                let pagination = { skip: 0, limit: 5, page:page };
                let paginationResult =  await paginator(Project, conditions, selectFields, pagination);
                res.send({...paginationResult});
        } catch(error) {
                console.error(error);
                throw error;
        }
}
const updateProject = async(req, res) => {
        try {
                let {projectId, projectName, description, isActive, userName } = req.body;
                const result = await Project.update({_id: projectId}, 
                        {name: projectName,  
                        description: description, 
                        udpatedBy: userName,
                        isActive: isActive
                });
                console.log(result);
                res.send({status: true, message: "Project updated successfully"});
        } catch(error) {
                console.log(error);
                throw error;
        }
}
module.exports = {
        addProject,
        getProject,
        updateProject
}