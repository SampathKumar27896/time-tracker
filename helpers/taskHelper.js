const Model = require('../models');

const createTask = async (task) => {
    try {
        const createResult = await Model.Task.create(
            {
                task_name: task.task_name,
                task_status: task.task_status
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
module.exports = {
    createTask: createTask,
    udpateTaskStatusById: udpateTaskStatusById
}