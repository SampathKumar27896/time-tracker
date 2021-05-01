const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const routes = require('./routes/routes');

app.use(bodyParser.json())
app.use('/',routes);


app.listen(port, () => {
    console.log(`Timetracker app listening at port ${port}`);
})