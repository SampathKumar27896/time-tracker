const routes = require('express').Router();
const projectValidator = require('../middlewares/validation/projectValidator');
const validateErrors = require('../middlewares/validation/validateErrors').validateErrors;
const projectController = require('../controllers/projectController');

routes.post('/add', projectValidator.addProjectValidationRules(), validateErrors, projectController.addProject);
routes.post('/update', projectValidator.updateProjectValidationRules(), validateErrors, projectController.updateProject);
routes.get('/all', validateErrors, projectController.getAllProjects);
routes.get('/edit/:projectId', projectValidator.editProjectValidationRules(), validateErrors, projectController.editProject)
module.exports = routes;