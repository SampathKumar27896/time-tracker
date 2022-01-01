'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: "createdById"})
      this.belongsTo(models.User, {foreignKey: "updatedById"})
      this.belongsTo(models.Task, {foreignKey: "taskId"})
      this.belongsTo(models.Project, {foreignKey: "projectId"})
    }
  };
  TaskLog.init({
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
    taskId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Task',
        key: 'id',
      }
    },
    timeSpent: {
      allowNull: false,
      type: DataTypes.TIME
    },
    comment: {
      allowNull: false,
      type: DataTypes.TEXT
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
    sequelize,
    modelName: 'TaskLog',
  });
  return TaskLog;
};