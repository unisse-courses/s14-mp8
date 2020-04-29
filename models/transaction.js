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

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cart', required: true }],
    dateOrdered: { type: Date, default: Date.now},
    status: { type: String, enum: ["Delivered", "In Transit", "Preparing"], required: true },
    total: { type: Number, required: true },
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
module.exports = mongoose.model('transaction', transactionSchema);