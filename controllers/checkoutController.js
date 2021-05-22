const transModel = require('../models/transaction');
const cartModel = require('../models/cart');
const userModel = require('../models/user');

exports.getCheckout = function(req,res){
    const userID = req.session.user;
    
    
    userModel.findOne({_id : userID}, function(err, user){
        if(err){
            throw err
        }
        else{
            cartModel.findOne({_id : userID}).populate({path: "cartItems.product", model: "products"}).lean().exec(function(err,cart){
                 if(err){
                     console.log(err);
                 }else{
                     var i;
                     var totalCartItems = 0;
                     var totalPrice = 0;
                     var tempPrice = 0;
                     var totalPricewDel = 0;
                     var address = user.address;

                     for(i = 0; i<cart.cartItems.length; i++){
                         totalCartItems += cart.cartItems[i].qty;
                         tempPrice = cart.cartItems[i].product.price * cart.cartItems[i].qty;
                         totalPrice += tempPrice;
                     }

                        totalPricewDel = totalPrice + 49;

        //             console.log(JSON.stringify(cart, null, 4));
                     res.render('checkout', {
                         title: "Checkout",
                         user: req.session.name,
                         cart : cart,
                         total : totalCartItems,
                         subTotal : totalPrice,
                         endPrice : totalPricewDel,
                         address : address,
                     });
                 }
            })
        }
    })
}

exports.confCheckout = function(req,res){
    const userID = req.session.user
    
    //GET FirstProduct 
    //GET totalQTY
    //GET totalPrice
    //Place dateOrdered
    //Place Status 1
    
    cartModel.findOneAndUpdate({_id : userID}, {$pullall : {"cartItems" : []}}, function(err,cart){
       if(err){
           throw(err)
       } else{
           res.sendStatus(200)
       }
    });
}
