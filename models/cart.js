const mongoose = require('./connection');

const cartSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref:"users", required: [true, "No User"]},
    cartItems: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref:"products"},
        qty: {type: Number}
    }],
    totalPrice :{type: Number}
}, {
     toObject: {
       virtuals: true,
     },
     toJSON: {
       virtuals: true,
     }
});

const cartModel = mongoose.model('cart', cartSchema);

exports.create = function(obj, next) {
  const cart = new cartModel(obj);

    cart.save(function(err, user) {
    next(err, user);
  });
};

exports.getOne = function(query, next){
    cartModel.findOne(query, function(err, cart){
       next(err,cart); 
    });
}
