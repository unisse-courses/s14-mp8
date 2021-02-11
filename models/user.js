const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"], unique: true},
    password : {type : String, required:[true, "No Password"]},
    address: {type: String, required:[false]}
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


exports.getOne = function(query, next) {
  userModel.findOne(query, function(err, user) {
    next(err, user);
  });
};


exports.getById = function(id, next) {
  userModel.findById(id, function(err, user) {
    next(err, user);
  });
};

