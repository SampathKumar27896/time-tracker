const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('time-tracker','root','root', {
    host: 'localhost',
    dialect: 'mysql'
});
const connect = async() => {
    try {
        await sequelize.authenticate();
        console.log('success');
    }catch(err) {
        console.error('failed');
    }
}
connect();
module.exports = sequelize;