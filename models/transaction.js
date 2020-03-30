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
    order: [{ type: Schema.Types.ObjectId, ref: 'product', required: true }],
    dateOrdered: { type: Date, required: [true, "No date provided"] },
    status: { type: Boolean, required: true }
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