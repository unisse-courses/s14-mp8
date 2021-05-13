const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
//    _id:{type: mongoose.Schema.Types.ObjectId},
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"], unique: true},
    password : {type : String, required:[true, "No Password"]},
    address: {type: String, required:[true, "Please provide your address!"]}
},{
     toObject: {
       virtuals: true,
     },
     toJSON: {
       virtuals: true,
     }
});

const userModel = mongoose.model('users', userSchema);

exports.create = function(obj, next) {
  const user = new userModel(obj);

  user.save(function(err, user) {
    next(err, user);
  });
};

module.exports = userModel