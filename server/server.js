const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3010;
const routes = require('./routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',routes);

app.listen(port, ()=>{
    console.log('Server is running on port: ' + port);
})