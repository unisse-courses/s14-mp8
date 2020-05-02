const db = require('../models/db.js');

const Product = require('./models/product');
const Cart = require('./models/cart');
const User = require('./models/user');
const Transaction = require('./models/transaction');


const controller = {
    
    getIndex: function(req,res){
        res.render('home', {
        title : 'Welcome to Milk Tea Labs!',
        })
    },
    
    getAdmin: function(req,res){
        res.render('admin', {
            title : 'Administrator Page',
            layout: 'adminLayout'
        })
    },
    
    
    
    

}

module.exports = controller;
