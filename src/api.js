const express = require('express');
const serverless = require('serverless-http');
const app = express();
const port = 5000;
const mongodb = require('./dbconnection');
app.get('/.netlify/functions/api/health', async(req, res) => {
    const result = await mongodb.collection('project').find({}).toArray();
    console.log(result)
    res.send(result);
});



module.exports.handler = serverless(app);