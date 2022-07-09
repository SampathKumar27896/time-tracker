const { MongoClient } = require("mongodb");

const uri = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(uri);

module.exports = client.db('timetracker');