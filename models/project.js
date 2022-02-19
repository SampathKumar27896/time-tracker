'use strict';
const {
  Model, Op
} = require('sequelize');
const constants = require('../constants');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      this.belongsTo(models.User, {foreignKey: "createdById"})
      this.belongsTo(models.User, {foreignKey: "updatedById"})
      this.hasMany(models.Task, {
        foreignKey: {
          name: 'projectId',
        }
      })
      this.hasMany(models.TaskLog, {
        foreignKey: {
          name: 'projectId',
        }
      })
    }
  };
  Project.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    projectName: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    projectDescription:{
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
    beforeCreate: async (project, options) => {
      const projectExists = await Project.findOne({ where: { projectName: project.projectName }}); 
      if(projectExists)
        return Promise.reject(constants.PROJECT_EXISTS_MSG); 
    },
    beforeUpdate: async(project, options) => {
      const projectExists = await Project.findOne({where: { projectName: project.projectName, id:{[Op.ne]: project.id}}});
      if(projectExists)
        return Promise.reject(constants.PROJECT_EXISTS_MSG);
    }
  },
    sequelize,
    modelName: 'Project',
  });
  return Project;
};