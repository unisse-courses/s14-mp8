const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js')
const db = require('./models/db.js');

const port = 3000;
const app = express();

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.listen(port, function() {
    console.log('App listening at port ' + port);
});