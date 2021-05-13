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
             
             console.log(JSON.stringify(cart, null, 4));
             res.render('cart', {
                 Title: "Cart",
                 user: req.session.name,
                 cart : cart,
                 total : totalCartItems
             });
         }
    })
}

//exports.getMenu = function(req,res){
//    productModel.find({},function(err,result){
//        if(err) throw err;
//        
//        var menuObjects = [];
//        
//        result.forEach(function(doc){
//           menuObjects.push(doc.toObject());
//        });
//        
//        res.render('menu', {
//           Title: 'Menu', 
//           products : menuObjects,
//           user : req.session.name
//       });
//    });
//}



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
