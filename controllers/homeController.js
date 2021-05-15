const cartModel = require('../models/cart');
const productModel = require('../models/product');

exports.getHome = function(req,res){
    userID = req.session.user;
    
    if(userID == undefined){
        res.render('home');    
    }else{
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
             res.render('home', {
                 user: req.session.name,
                 total : totalCartItems
             });
        }})
    }
}