const cartModel = require('../models/cart');

exports.addToCart = function(req,res){
    var cartItem = {
        
    };
    
    cartModel.addToCart(cartItem, function(err,cartItem){
        var result;
        
        if(err){
            console.log(err.errors);
            
            result = {success : false, message: "Item not added to Cart"}
            res.send(result);
        }
        else{
            console.log("Item added to cart!");
            console.log(cartItem);
            
            result ={ success: true, message: "Item added to cart!"}
            
            res.send(result);
        }
    })
}