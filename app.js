const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes');
require('dotenv').config()
const { API_PORT }  = process.env;
app.use(cors());
app.use(bodyParser.json())
app.get('/hello', (req, res) => {
    res.status(200).send("hello world from time-spent");
})
app.use('/', routes);

app.use((err, req, res,next) => {
    if(err)
	    res.send({status: false, message :(err.message)? err.message: err, stackTrace: (err.stack)? err.stack: "" });
    next(); 
});
const applicationPort = process.env.PORT || API_PORT;
app.listen(applicationPort, () => {
    console.log(`Timetracker app listening at port ${applicationPort}`);
})