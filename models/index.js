const sequelize = require('../database-connection');
const { DataTypes } = require('sequelize')
module.exports = {
    Task: require('../models/task')(sequelize, DataTypes),
    TaskLog: require('../models/tasklog')(sequelize, DataTypes),
}