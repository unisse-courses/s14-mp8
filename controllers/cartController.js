const cartModel = require('../models/cart');
const productModel = require('../models/product');

exports.getCart = function(req,res){
    const userID = req.session.user;
    
    res.render('cart', { 
      user: req.session.name
    });
}