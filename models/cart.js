const mongoose = require('./connection');

const cartSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, required: [true, "No User"]},
    product: [{type: mongoose.Schema.Types.ObjectId}],
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
