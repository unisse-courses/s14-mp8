const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

// MODEL IMPORTS
const productModel = require('./models/product.js');
const cartModel = require('./models/cart.js');
const userModel = require('./models/user.js');
const transactionModel = require('./models/transaction.js');

const app = express();
const port = 3000;

const mongoClient = mongodb.MongoClient;
const url = "mongodb+srv://Broqzzz:admin@ccapdev-ohkor.mongodb.net/test?retryWrites=true&w=majority";

const options = { useUnifiedTopology :true};

const dbName ="MilkTeaLabs";

const colUsers = "users";
const colCart = "cart";
const colTransaction = "transaction";
const colProduct = "product";

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultView: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials')
}));

app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get(["/", "/home"], function(req, res) {
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
    mongoClient.connect(url, options, function(err, client) {
        if(err) throw err;
        const dbo = client.db(dbName);
        
        dbo.collection(colProduct).find({}).toArray(function(err, result) {
            if(err) throw err;

            console.log("Read Successful!");
            client.close();
            res.render('menu', { 
                title: 'Menu',
                product: result
            });
        });
    });
});

//add menu item
//app.post()

app.post('/addProduct' , function(req,res){
    const product = new productModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price
    });
    
    product.save(function (err,result){
        if (err) throw err;
        res.send(result.toObject());
    });
});

app.get('/products', function(req, res) {
  productModel.find({}, function(err, products) {
    res.send(products);
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

app.get('/editprofile', function(req, res) {
    res.render('editprofile', {
        title : 'Edit User Profile',
    });
});

app.get('/search', function(req, res) {
    res.render('search', {
        title : 'Search and Filter',
    });
});


app.get('/users', function(req, res) {
    res.render('search', {
        title : 'Search and Filter',
    });
});
app.use(express.static('public'));

app.listen(port, function() {
    console.log('App listening at port ' + port);
});