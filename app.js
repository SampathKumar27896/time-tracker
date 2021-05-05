const express = require('express');
const app = express();
const cors = require('cors')
const port = 3001;
const bodyParser = require('body-parser')
const routes = require('./routes/routes');

app.use(bodyParser.json())
app.use(cors());
app.use('/',routes);


app.listen(port, () => {
    console.log(`Timetracker app listening at port ${port}`);
})