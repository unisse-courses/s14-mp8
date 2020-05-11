const productModel = require('../models/product');

exports.getMenu = function(req,res){
    productModel.getAllProducts({name : 1}, function(products){
       res.render('menu', {Title: 'Menu', products : products, user : req.session.name}) 
    });
}