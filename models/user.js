const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"], unique: true},
    password : {type : String, required:[true, "No Password"]},
    address : {type : String, required:[true, "No Address"]},
    favorites: [{type: mongoose.Schema.Types.ObjectId, required : false}],
    isAdmin : {type: Boolean, required : true},
    cart: [{type: mongoose.Schema.Types.ObjectId, required : false}]
},{
     toObject: {
       virtuals: true,
     },
     toJSON: {
       virtuals: true,
     }
});

module.exports = mongoose.model('Users', userSchema);