const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://time-tracker-user:time-tracker-user@cluster1.qr3w1.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

module.exports = client.db('timetracker');