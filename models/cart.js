const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://Broqzzz:admin@ccapdev-ohkor.mongodb.net/test?retryWrites=true&w=majority';

//Fix the rest of this below

/** README **
  We need to set useFindAndModify to false because mongoose's findOneAndUpdate
  is using a deprecated function: findAndModify.
  This will suppress the warning.
**/
const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    address : {type : String, required:[true, "No Address"]},
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

   
/** README **
  Export the model as the main content of this module.
**/
module.exports = mongoose.model('cart', cartSchema);