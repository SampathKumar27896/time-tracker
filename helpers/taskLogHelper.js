const Model = require('../models');
const createTaskLog = async (taskLog) => {
    try {
       await  Model.TaskLog.create(taskLog);
       return true;
    }catch(err) {
        console.log(err);
        return false;
    }   
}
module.exports = {
    createTaskLog: createTaskLog
}