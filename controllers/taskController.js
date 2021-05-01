
const taskHelper = require('../helpers/taskHelper');
const taskLogHelper = require('../helpers/taskLogHelper');
const addTask = async (req, res) => {
    try {
        const task = {
            task_name: req.body.taskName,
            task_status: req.body.taskStatus
        }
        if(await taskHelper.createTask(task))
            res.status(200).send({ message: "Task added successfully" });
        res.status(500).send({ message: "Something went wrong", error: err });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong", error: err });
    }
}
const udpateTask = async(req, res) => {
    try {
        const taskStatus = req.body.taskStatus;
        const taskId = req.body.taskId;
        switch(taskStatus) {
            case 2:
            case 4:
            case 5:
                if(await taskHelper.udpateTaskStatusById(taskId, taskStatus) !== false)
                    res.status(200).send({ message: "Task updated successfully" });
                else
                    res.status(500).send({ message: "Something went wrong on updation"});
            break;
            case 3:
                const taskLog = {
                    task_id: req.body.taskId,
                    task_comment: req.body.taskComment,
                    start_time: new Date(),
                    end_time: new Date()
                }
                if(await taskLogHelper.createTaskLog(taskLog)){
                    if(await taskHelper.udpateTaskStatusById(taskId, taskStatus) !== false)
                        res.status(200).send({ message: "Task updated successfully" });
                    res.status(500).send({ message: "Something went wrong on updation"});
                } 
                else
                    res.status(500).send({ message: "Something went wrong on updation"});
            
        }
    }catch(err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong", error: err[0] });
    }
}
module.exports = {
    addTask: addTask,
    udpateTask: udpateTask
}