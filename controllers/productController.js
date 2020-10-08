const productModel = require('../models/product');

exports.getMenu = function(req,res){
    productModel.getAllProducts({name : 1}, function(products){
       res.render('menu', {
           Title: 'Menu', 
           products : products, 
           user : req.session.name
       }); 
    });
}

exports.addItem = function(req,res){
    const newProduct = {
        name : 'Pearl Milk Tea',
        description : 'Original Milk Tea',
        price : 200,
        img : '/img/tea2.jpg'
    }
    

    productModel.addProduct(newProduct, function(err,product){
        if(err){
            console.log(err);
            req.flash('error_msg', 'Unable to add item');
            res.redirect('/menu');
        }else{
            console.log(product)
            req.flash('success_msg', 'Item Added!');
            res.redirect('/menu');
        }
    });
}

exports.addtoCart = function(req,res){
    const toCART = {
        
    }
}
