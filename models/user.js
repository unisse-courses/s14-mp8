const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"], unique: true},
    password : {type : String, required:[true, "No Password"]},
},{
     toObject: {
       virtuals: true,
     },
     toJSON: {
       virtuals: true,
     }
});

const userModel = mongoose.model('users', userSchema);

// Saving a user given the validated object
exports.create = function(obj, next) {
  const user = new userModel(obj);

  user.save(function(err, user) {
    next(err, user);
  });
};

// Retrieving just ONE user based on a query (first one)
exports.getOne = function(query, next) {
  userModel.findOne(query, function(err, user) {
    next(err, user);
  });
};


// Retrieving a user based on ID
exports.getById = function(id, next) {
  userModel.findById(id, function(err, user) {
    next(err, user);
  });
};

// Updating the information of user---------------------------------------------------
exports.getAndUpdate = function(filter, updates, options, next) {
  //const options = { new: true };

  userModel.findOneAndUpdate(filter, updates, options, function(err, updateRes) {
    next(err, updateRes);
  });
};