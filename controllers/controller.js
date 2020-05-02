const db = require('../models/db.js');

const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const Transaction = require('../models/transaction');


const controller = {
    
    getFavicon: function (req, res) {
        res.status(204);
    },
    
    getIndex: function(req,res){
        res.render('home.hbs', {
            title : 'Welcome to Milk Tea Labs!',
        });
    },
    
    getAdmin: function(req,res){
        res.render('admin.hbs', {
            title : 'Administrator Page',
            layout: 'adminLayout'
        });
    },
    
    
    
    

}

module.exports = controller;
