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
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"], unique: true},
    password : {type : String, required:[true, "No Password"]},
    favorites: [{type: mongoose.Schema.Types.ObjectId, required : false}],
    isAdmin : {type: Boolean, required : true},
    transactions : [{type : mongoose.Schema.Types.ObjectId, required : false}],
}, {
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
module.exports = mongoose.model('users', userSchema);