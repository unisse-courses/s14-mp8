const productModel = require('../models/product');
const cartModel = require('../models/cart');

exports.getMenu = function(req,res){
    productModel.find({},function(err,result){
        if(err) throw err;
        
        var menuObjects = [];
        
        result.forEach(function(doc){
           menuObjects.push(doc.toObject()); 
        });
        
        res.render('menu', {
           Title: 'Menu', 
           products : menuObjects,
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


exports.addToCart = function(req,res){
    const userID = req.session.user;
    
    console.log(req.params.id)
    console.log(userID)
    
    cartModel.findByIdAndUpdate({_id:userID},
    {
      $set: {
          cartItem : {
              product : req.params.id,
              //qty : ???
          }
      }
    }, (err) => {
      if(err){
        res.send(err);
      }
    });
}
