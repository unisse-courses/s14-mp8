const productModel = require('../models/product');
const cartModel = require('../models/cart');

exports.getMenu = function(req,res){
    userID = req.session.user;
    
    if(userID == undefined){
        productModel.find({},function(err,result){
            if(err) throw err;
            var menuObjects = [];
        
            result.forEach(function(doc){
               menuObjects.push(doc.toObject());
            });
        
            res.render('menu', {
               Title: 'Menu', 
               products : menuObjects,
               user : req.session.name,
           });
        });
    }else{
         productModel.find({},function(err,result){
            if(err) throw err;
            var menuObjects = [];
        
            result.forEach(function(doc){
               menuObjects.push(doc.toObject());
            });
             
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

                    res.render('menu', {
                        Title: 'Menu',
                        user: req.session.name,
                        products : menuObjects,
                        total : totalCartItems
                    });
                }
            });
        });
    }   
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
    const itemID = req.params.id;
    
    console.log("product " + itemID);
    console.log("user " + userID);
    
    cartModel.find({_id: userID , "cartItems.product" : itemID},function(err,cart){
        console.log(err);
        console.log(cart);
        
        if(cart.length){
            cartModel.findOneAndUpdate({_id:userID , "cartItems.product" : itemID},{$inc : {"cartItems.$.qty" : 1}},{new:true}, function(err,cart){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("INCREMENT ITEM");
                    console.log(cart);
                }
            });
        }
        else{
            cartModel.findByIdAndUpdate({_id:userID},
                {
                    $push: {
                        cartItems : {
                            product : itemID,
                            qty : 1
                        }
                    }
                }, (err,cart) => {
                    if(err){
                        res.send(err)  
                    }
                    else{
                        console.log(cart)
                        res.send(cart)
                    }
                });
        }
    });
}
