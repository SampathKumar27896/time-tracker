const routes = require('express').Router();
const taskValidator = require('../middlewares/validation/taskValidator');
const validateErrors = require('../middlewares/validation/validateErrors').validateErrors;
const taskController = require('../controllers/taskController');

routes.post('/add', taskValidator.addTaskValidationRules(), validateErrors, taskController.addTask);
routes.post('/update', taskValidator.updateTaskValidationRules(), validateErrors, taskController.updateTask);
routes.post('/addLog', taskValidator.addTaskLogValidator(), validateErrors, taskController.addTaskLog);
routes.get('/all', taskController.getAllTasks);
module.exports = routes;