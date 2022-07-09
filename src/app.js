const express = require('express');
const app = express();
const port = 5000;

app.get('/health', (req, res) => {
    res.send("Hello world health checkup");
});

app.listen(port, () =>{
    console.log(`Server is listening to the port: ${port}`);
})