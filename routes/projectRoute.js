const routes = require('express').Router();
const projectValidator = require('../middlewares/validation/projectValidator');
const validateErrors = require('../middlewares/validation/validateErrors').validateErrors;
const projectController = require('../controllers/projectController');

routes.post('/add', projectValidator.addProjectValidationRules(), validateErrors, projectController.addProject);
routes.post('/update', projectValidator.updateProjectValidationRules(), validateErrors, projectController.updateProject);
routes.get('/all', projectController.getAllProjects);
module.exports = routes;