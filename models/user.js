'use strict';
const {
  Model
} = require('sequelize');
const constants = require('../constants');
const {generatePasswordHash} = require('../helpers/utils');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Project, {
        foreignKey: {
          name: 'createdById',
        }
      })
      this.hasMany(models.Project, {
        foreignKey: {
          name: 'updatedById',
        }
      })
      this.hasMany(models.Task, {
        foreignKey: {
          name: 'createdById',
        }
      })
      this.hasMany(models.Task, {
        foreignKey: {
          name: 'updatedById',
        }
      })
      this.hasMany(models.TaskLog, {
        foreignKey: {
          name: 'createdById',
        }
      })
      this.hasMany(models.TaskLog, {
        foreignKey: {
          name: 'updatedById',
        }
      })
    }
  };
  User.init({
    userName:{
      allowNull: false,
      unique: true,
      len: [3, 255],
      type:DataTypes.STRING
    },
    password:{
      allowNull: false,
      type:DataTypes.STRING
    },
    email:{
      allowNull: false,
      unique: true,
      type:DataTypes.STRING
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
  
    hooks: {
      beforeCreate: async (user, options) => {
        const userExists = await User.findOne({ where: { userName: user.userName }}); 
        const emailExists = await User.findOne({ where: { email: user.email }});
        if(userExists)
          return Promise.reject(constants.USER_EXISTS_MSG); 
        else if(emailExists)
          return Promise.reject(constants.EMAIL_EXISTS_MSG);
        else
          user.setDataValue('password', await generatePasswordHash(user.password));
      }
    },
    sequelize,
    modelName: 'User',
    timestamps: true,
  });
  return User;
};