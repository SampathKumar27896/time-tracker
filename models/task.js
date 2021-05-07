'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_status: {
      type:DataTypes.INTEGER,
      references: {
        model: 'TaskStatus',
        key: 'id',
      }
    },
    duration: {
      type:DataTypes.TIME,
      allowNull: true,
    },
    last_start_time: {
      type:DataTypes.TIME,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  Task.associate = function(models) {
    User.belongsTo(models.TaskStatus, {foreignKey: 'task_status', as: 'status'})
  };
  return Task;
};