const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes');
require('dotenv').config()
const { API_PORT }  = process.env;
app.use(bodyParser.json())
app.use('/', routes);

app.use(cors());
app.use((err, req, res,next) => {
    if(err)
	    res.send({status: false, message :(err.message)? err.message: err, stackTrace: (err.stack)? err.stack: "" });
    next(); 
});

app.listen(API_PORT, () => {
    console.log(`Timetracker app listening at port ${API_PORT}`);
})