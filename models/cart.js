const mongoose = require('./connection');

const cartSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false },
    isGuest: {type: Boolean, required: true},
    cartItem: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
        quantity: { type: Number, required: true},
        amount: { type: Number, required: true}
    }],
    total: {type : Number, required: false},
},{
        toObject: {
            virtuals: true,
        },
        toJSON: {
            virtuals: true,
        }
});

const cartModel = mongoose.model('Cart', cartSchema);


exports.addToCart = function(){
    
}





module.exports = mongoose;