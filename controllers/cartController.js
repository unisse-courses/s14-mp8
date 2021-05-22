const cartModel = require('../models/cart');

exports.getCart = function(req,res){
    const userID = req.session.user;
    
    if(userID == undefined){
       req.flash('error_msg', 'Please Log In');
       res.redirect('/login');
    }
    else{
        cartModel.findOne({_id : userID}).populate({path: "cartItems.product", model:"products"}).lean().exec(function(err,cart){
             if(err){
                 console.log(err);
             }else{
                 var i;
                 var totalCartItems = 0;
                 var totalPrice = 0;
                 var tempPrice = 0;


                for(i = 0; i<cart.cartItems.length; i++){
                     totalCartItems += cart.cartItems[i].qty;
                     tempPrice = cart.cartItems[i].product.price * cart.cartItems[i].qty;
                     totalPrice += tempPrice;
                }


    //             console.log(JSON.stringify(cart, null, 4));
                 res.render('cart', {
                     Title: "Cart",
                     user: req.session.name,
                     cart : cart,
                     total : totalCartItems,
                     endPrice : totalPrice
                 });
             }
        })
    }
    

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

exports.removeItem = function(req,res){
    const itemID = req.params.id
    const userID = req.session.user
    
    cartModel.findOneAndUpdate({_id : userID}, {$pull : {"cartItems" : {product : itemID}}}, function(err,cart){
       if(err){
           throw(err)
       } else{
           res.sendStatus(200)
       }
    });
}

