const routes = require('express').Router();
const taskController = require('../controllers/taskController');

routes.post('/add_task', taskController.addTask);
routes.post('/update_task', taskController.udpateTask);
routes.get('/list_tasks', taskController.listAllTasks);
module.exports = routes;