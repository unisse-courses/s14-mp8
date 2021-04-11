const cartModel = require('../models/cart');
const productModel = require('../models/product');

exports.getCart = function(req,res){
    const userID = req.session.user;
    
    res.render('cart', { 
      user: req.session.name
    });
}


//app.get('/books', function(req, res) {
//  // Retrieves all books and populates the reference to genre and author
//  Book.find({})
//    .populate('genre')
//    .populate('author')
//    .exec(function(err, books) {
//      res.send(books);
//    });
//});
