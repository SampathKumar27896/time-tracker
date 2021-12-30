const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const baseName = path.basename(__filename);
const db = {};
const sequelize = new Sequelize('time-tracker','root','root', {
    host: 'localhost',
    dialect: 'mysql'
});


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== baseName) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
