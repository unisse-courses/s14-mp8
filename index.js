const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.engine( 'hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
}));

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.listen(port, function() {
    console.log('App listening at port ' + port);
});

app.get('/', function(req,res){
    res.render('home.hbs', {
        title : 'Welcome to Milk Tea Labs!',
    });
});