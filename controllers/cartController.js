const cartModel = require('../models/cart');
const productModel = require('../models/product');

exports.getCart = function(req,res){
    const userID = req.session.user;
    
   cartModel.findOne({_id : userID})
        .populate({path: "cartItems.product", model: "products"}).lean().exec(function(err,cart){
         if(err){
             console.log(err);
         }else{
             var i;
             var totalCartItems = 0;
             
             for(i = 0; i<cart.cartItems.length; i++){
                 totalCartItems += cart.cartItems[i].qty;
             }
             
//             console.log(JSON.stringify(cart, null, 4));
             res.render('cart', {
                 Title: "Cart",
                 user: req.session.name,
                 cart : cart,
                 total : totalCartItems
             });
         }
    })
}

exports.decItemCart = function(req,res){
    const userID = req.session.user;
    const itemID = req.params.id;
    
    
    cartModel.find({_id: userID , "cartItems.product" : itemID},function(err,cart){        
        if(cart.length){
            cartModel.findOneAndUpdate({_id:userID , "cartItems.product" : itemID},{$inc : {"cartItems.$.qty" : -1}},{new:true}, function(err,cart){
                if(err){
                    console.log(err);
                }
                else{
                    
                    res.sendStatus(204);
                }
            });
        }
    });
}


exports.incItemCart = function(req,res){
    const userID = req.session.user;
    const itemID = req.params.id;
    
    
    cartModel.find({_id: userID , "cartItems.product" : itemID},function(err,cart){
        if(cart.length){
            cartModel.findOneAndUpdate({_id:userID , "cartItems.product" : itemID},{$inc : {"cartItems.$.qty" : 1}},{new:true}, function(err,cart){
                if(err){
                    console.log(err);
                }
                else{
                    res.sendStatus(204);
                }
            });
        }
    });
}
