const mongoose = require('mongoose');

const databaseURL = 'mongodb://localhost:27017/transactiondb';

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
    cart: [{ type: Schema.Types.ObjectId, ref: 'cart', required: true }],
    transactionHistory: { type: Schema.Types.ObjectId, ref: 'transaction', required: true },
    name: { type: String, lowercase: true, required: [true, "No name provided"] },
    username: { type: String, lowercase: true, required: [true, "No username provided"], index: { unique: true } },
    password: { type: String, required: [true, "No password provided"] },
    address: { type: String, required: [true, "No address provided"] },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'product', required: true }],
    img: { type: String, lowercase: true, required: true },
    isAdmin: { type: Boolean, required: true }
});

  /** README **
    Virtuals are other fields that do not persist in mongodb.
    By setting virtuals: true for toObject and toJSON, this makes all the
    Document.toObject() function include any virtuals value available.
    For our case, we don't have any.
  **/
  // }, {
  //   toObject: {
  //     virtuals: true,
  //   },
  //   toJSON: {
  //     virtuals: true,
  //   }
  // }


/** README **
  Export the model as the main content of this module.
**/
module.exports = mongoose.model('transaction', transactionSchema);