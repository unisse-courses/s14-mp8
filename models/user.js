const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "Please provide a Name!"]},
    username : {type : String, lowercase: true, required:[true, "No Username"], unique: true},
    password : {type : String, required:[true, "No Password"]},
    address : {type : String, required:[true, "No Address"]},
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref:"products", required : false}],
    cart: {type: mongoose.Schema.Types.ObjectId, required : false},
    transactions : [{type : mongoose.Schema.Types.ObjectId}],
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