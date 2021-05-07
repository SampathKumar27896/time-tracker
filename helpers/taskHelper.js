const Model = require('../models');
const { Op } = require("sequelize");

const createTask = async (task) => {
    try {
        await Model.Task.create(
            {
                task_name: task.task_name,
                task_status: task.task_status,
                duration: task.duration,
                last_start_time: task.last_start_time
            }
        );
        return true;
    }catch(err) {
        console.log(err);
        return false;
    }
}
const udpateTaskStatusById = async (taskId, taskStatus) => {
    try {
        return await Model.Task.update({
            task_status: taskStatus,
        },{where: {id:taskId}});
    }catch(err) {
        console.log(err);
        return false;
    }   
}

const getAllTasks = async(search) => {
    try {
        const taskLists = await Model.Task.findAll({
            // where: {
            //     task_status: {[Op.ne]: 5}
            // }
        });
        // console.log(taskLists);
        return taskLists;
    }catch(err) {
        console.log(err);
        return false;
    }
  
}
module.exports = {
    createTask: createTask,
    udpateTaskStatusById: udpateTaskStatusById,
    getAllTasks: getAllTasks
}