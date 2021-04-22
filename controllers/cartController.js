const cartModel = require('../models/cart');
const productModel = require('../models/product');

exports.getCart = function(req,res){
    const userID = req.session.user;
    
    cartModel.findOne({_id : userID})
        .populate('products').exec(function(err,cart){
         res.render('cart', { 
            user: req.session.name,
            cart : cart
         });
    })
}


//exports.updateUser = function(req,res) {
//  userModel.findByIdAndUpdate({_id:req.params.id},
//    {
//      $set: {
//        name : req.body.name,
//        username: req.body.username,
//        address: req.body.address,
//      }
//    }, (err) => {
//      if(err){
//        res.send(err);
//      }
//    });
//};
