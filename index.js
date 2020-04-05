const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

// MODEL IMPORTS
const productModel = require('./models/product.js');
const cartModel = require('./models/cart.js');
const userModel = require('./models/user.js');
const transactionModel = require('./models/transaction.js');

const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");


const url = "mongodb+srv://Broqzzz:admin@ccapdev-ohkor.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(url, {
    useUnifiedTopology:true
});

const dbName ="MilkTeaLabs";
const colUsers = "users";
const colCart = "cart";
const colTransaction = "transaction";
const colProduct = "product";

async function addProduct(){
    try{
        await client.connect();
        console.log("Connected");
        
        const db = client.db(dbName);
        
        const col = db.collection(colProduct);
        
        var product = 
        {
            name: "Pearl Milk Tea",
            description: "Classic Milk Tea",
            price: "200",
            img: "/img/tea1.png"
        };
        
        col.insertOne(product);   
    }
    catch(err){
        console.log(err.stack);
    }
}

addProduct();

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
    res.render('menu', {
        
    });
});

// Students route
app.get('/students', function(req, res) {
    /** == README == **
      This used to hold the mongodb connection and find.
      But now, using only the model, we use the same find parameter.
      Using the query helper sort() so we also have the exec() function
      to be able to actually execute the query.
    **/
    studentModel.find({}).sort({ name: 1 }).exec(function(err, result) {
      // Handlebars fix!
      // Because of this error warning:
      // https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access
      // we need to convert each object returned from the find to a plain JS object
      var studentObjects = [];
  
      result.forEach(function(doc) {
        studentObjects.push(doc.toObject());
      });
      // end handlebars fix!
  
      res.render('students', { title: 'Students', students: studentObjects });
      // try passing result for students instead of studentObjects to see the error!
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