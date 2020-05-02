const express = require('express');
const controller = require('../controllers/controller.js');

const app = express();



//GETS
app.get('/',controller.getIndex);
app.get('/home', controller.getIndex);
app.get('/logout', controller.getIndex);

app.get('/admin', controller.getAdmin);


//POSTS



module.exports = app;

//
////-------------------------------------------------------------------------------------------
////menu route
//app.get('/menu', function(req, res) {
//    Product.find({}, function(err, products){
//        res.render('menu',{
//            title : "Menu",
//            products,
//        });
//    });
//});
//
////add menu item
////app.post()
//
//app.post('/addProduct' , function(req,res){
//    const tempProduct = new Product({
////        name : 'Alien Tonic',
////        description : 'Matcha Overload with Green Pudding',
////        price : 200,
////        img : 'img/tea1.jpg'
//    });
//    
//    tempProduct.save(function(err,result){
//       if(err) throw(err);
//        res.send(result);
//    });
//});
//
////-------------------------------------------------------------------------------------------
//app.get('/cart', function(req, res) {
//    res.render('cart', {
//        title : 'Cart',
//    });
//});
//
//app.get('/history', function(req, res) {
//    res.render('history', {
//        title : 'Transaction History',
//        layout: 'mainLoggedIn'
//    });
//});
//
//app.get('/register', function(req, res) {
//    res.render('register', {
//        title : 'Register',
//    });
//});
//
//app.get('/login', function(req, res) {
//    res.render('login', {
//        title : 'Login',
//    });
//});
//
//app.get('/loggedIn', function(req,res){
//   res.render('home',{
//        layout:'mainLoggedIn' 
//   });
//});
//
//app.get('/editprofile', function(req, res) {
//    res.render('editprofile', {
//        title : 'Edit User Profile',
//        layout: 'mainLoggedIn'
//    });
//});