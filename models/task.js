'use strict';
const {
  Model
} = require('sequelize');
const constants = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "createdById"})
      this.belongsTo(models.User, {foreignKey: "updatedById"})
      this.belongsTo(models.Project, {foreignKey: "projectId"})
      this.hasMany(models.TaskLog, {
        foreignKey: {
          name: 'taskId',
        }
      })
    }
  };
  Task.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    projectId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Project',
        key: 'id',
      }
    },
    taskName: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    taskDescription:{
      allowNull: false,
      type: DataTypes.TEXT,
    },
    isActive: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    }, 
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }, 
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    createdById: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    updatedById: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      }
    }
  }, {
    hooks: {
      beforeCreate: async (task, options) => {
        const projectExists = await Task.findOne({ where: { taskName: task.taskName, projectId: task.projectId }}); 
        if(projectExists)
          return Promise.reject(constants.TASK_EXISTS_MSG); 
      }
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};