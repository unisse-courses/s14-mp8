const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

// MODEL IMPORTS
const Product = require('./models/product');
const Cart = require('./models/cart');
const User = require('./models/user');
const Transaction = require('./models/transaction');

const app = express();
const port = 3000;

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
}));

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get(["/", "/home", "/logout"], function(req, res) {
    res.render('home', {
        title : 'Welcome to Milk Tea Labs!',
    });
});

app.get('/admin', function(req, res) {
    res.render('admin', {
        title : 'Administrator Page',
        layout: 'adminLayout'
    });
});

//-------------------------------------------------------------------------------------------
//menu route
app.get('/menu', function(req, res) {
    Product.find({}, function(err, products){
        res.render('menu',{
            title : "Menu",
            products,
        });
    });
});

//add menu item
//app.post()

app.post('/addProduct' , function(req,res){
    const tempProduct = new Product({
//        name : 'Alien Tonic',
//        description : 'Matcha Overload with Green Pudding',
//        price : 200,
//        img : 'img/tea1.jpg'
    });
    
    tempProduct.save(function(err,result){
       if(err) throw(err);
        res.send(result);
    });
});

//-------------------------------------------------------------------------------------------
app.get('/cart', function(req, res) {
    res.render('cart', {
        title : 'Cart',
    });
});

app.get('/history', function(req, res) {
    res.render('history', {
        title : 'Transaction History',
        layout: 'mainLoggedIn'
    });
});

app.get('/register', function(req, res) {
    res.render('register', {
        title : 'Register',
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        title : 'Login',
    });
});

app.get('/loggedIn', function(req,res){
   res.render('home',{
        layout:'mainLoggedIn' 
   });
});

app.get('/editprofile', function(req, res) {
    res.render('editprofile', {
        title : 'Edit User Profile',
        layout: 'mainLoggedIn'
    });
});

app.use(express.static('public'));

app.listen(port, function() {
    console.log('App listening at port ' + port);
});