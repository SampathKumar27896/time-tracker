const dotenv = require('dotenv');
dotenv.config();

module.exports = {
        dbConnectionURL: process.env.DB_CONNECTION_STRING,
        sessionSecret: process.env.SESSION_SECRET,
        apiBaseUrl: process.env.API_BASE_URL
}       