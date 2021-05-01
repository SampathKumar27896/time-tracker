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
      // define association here
    }
  };
  TaskLog.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    task_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Task',
        key: 'id',
      }
    },
    task_comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
    start_time: {
      allowNull: false,
      type: DataTypes.DATE
    },
    end_time: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'TaskLog',
  });
  return TaskLog;
};