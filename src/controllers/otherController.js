const {Project} = require('../mongoSchemas/schema');
// const projectSchema = new Schema({
//         userId: mongoose.ObjectId,
//         name: String,
//         description: String,
//         isActive: Boolean,
//         createdBy: String,
//         updatedBy: String
//     }, { timestamps: true});
//     projectSchema.index({ userId: 1});
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

module.exports = {
        addProject,
}