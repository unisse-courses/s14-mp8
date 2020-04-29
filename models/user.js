const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://Broqzzz:admin@ccapdev-ohkor.mongodb.net/MilkTeaLabs?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"], unique: true},
    password : {type : String, required:[true, "No Password"]},
    address : {type : String, required:[true, "No Address"]},
    favorites: [{type: mongoose.Schema.Types.ObjectId, required : false}],
    isAdmin : {type: Boolean, required : true},
    cart: [{type: mongoose.Schema.Types.ObjectId, required : false}]
});

module.exports = mongoose.model('users', userSchema);