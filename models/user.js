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

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"]},
    password : {type : String, required:[true, "No Password"]},
    address : {type : String, required:[true, "No Address"]},
    favorites: {type: mongoose.Schema.Types.ObjectId, required : false},
    isAdmin : {type: Boolean, required : true},
    cart: [{type: mongoose.Schema.Types.ObjectId, required : false}]
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
module.exports = mongoose.model('users', userSchema);