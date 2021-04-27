const bcrypt = require('bcrypt');

const userModel = require('../models/user');
const cartModel = require('../models/cart');

const {validationResult} = require('express-validator');

exports.getLoginPage = function(req,res){
    var name = req.session.name;
    
    if(name != undefined){
       req.flash('error_msg', 'Already logged in');
       res.redirect('/');
    }
    else{
         res.render('login');
    }
}

exports.getRegisterPage = function(req,res){
    var name = req.session.name;
    
    if(name != undefined){
       req.flash('error_msg', 'Already logged in');
       res.redirect('/');
    }
    else{
         res.render('register');
    }
}



exports.registerUser = function(req,res){
  const errors = validationResult(req);
    
    if(errors.isEmpty()){
        const {name, username, address, password1} = req.body;
        
        userModel.findOne({username : username}, function(err, result){
           if(result){
               req.flash('error_msg', 'User already exists');
               res.redirect('/login');
           } else{
               const saltRounds = 10;
               
               bcrypt.hash(password1, saltRounds, function(err, hashed){
                   const newUser = {
                       name,
                       username,
                       password : hashed,
                       address
                   };
                   
                   console.log(newUser);
                   
                   userModel.create(newUser, function(err, user){
                       if(err){
                           console.log(err);
                           req.flash('error_msg', 'Could not create user. Please Try Again!');
                           res.redirect('/register');
                       }else{
                           userModel.findOne({username : username},(err,user1)=>{
                               const cart = {
                                   _id : user1._id,
                                   products : []
                               }
                               
                               cartModel.create(cart, function(err,cart){
                                   if(err){
                                       console.log(err);
                                       req.flash('error_msg', 'Could not create cart. Please Try Again!');
                                       res.redirect('/register');
                                   }
                                   else{
                                       req.flash("success_msg", 'You are now registered!');
                                       res.redirect('/login')
                                   }
                               });
                           });
                       }
                   })
               })
               
               
           }
        });
    }else{
        const messages = errors.array().map((item) => item.msg);
        
        req.flash('error_msg', messages.join(' '));
        res.redirect('/register');
    }
};


exports.loginUser = function(req,res){
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const {
        username,
        password
      } = req.body;

    userModel.findOne({ username: username }, (err, user) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        // Successful query
        if (user) {
          // User found!

          // Check password with hashed value in the database
          bcrypt.compare(password, user.password, (err, result) => {
            // passwords match (result == true)
            if (result) {
              // Update session object once matched!
              req.session.user = user._id;
              req.session.name = user.name;

              console.log(req.session);
              req.flash('success_msg', "Logged In");
              res.redirect('/');

            } else {
              // passwords don't match
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });
        } else {
          // No user found
          req.flash('error_msg', 'Unregistered Username. Please register.');
          res.redirect('/register');
        }
      }});
    } else {
      const messages = errors.array().map((item) => item.msg);

      req.flash('error_msg', messages.join(' '));
      res.redirect('/login');
    }
};

exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
        console.log(req.session); // Gives session
        res.clearCookie('connect.sid');
        res.redirect('/login');
        console.log(req.session); // Must be undefined
    });
  }
};

exports.getUser = function(req,res){
    userModel.findOne({ _id:req.session.user}, (err, user) => {
        if(user){
            res.render('profile', {
                userID : user._id,
                name : user.name,
                username : user.username,
                password : user.password,
                address : user.address,
                user: req.session.name
            });
        }
    });
};

exports.updateUser = function(req,res){
    const {name, username, currPass, newPass1, newPass2, address} = req.body;
    
    if(currPass == undefined){
        console.log("Update name and add only");
        var update ={
            $set : {name,address}
        }
            
            userModel.findByIdAndUpdate({_id : req.session.user}, update, {new: true}, function(err, user) {
                if(err){
                    throw err;
                }else{
                    if(user){
                        console.log(user);
                        req.flash('success_msg','Name and address has been changed');
                        res.redirect('/profile');
                    }
                }
            })
        }else{
            userModel.findOne({_id:req.session.user},function(err,user){
                if(err){
                    req.flash('error_msg', 'Something happened! Please try again.');
                    res.redirect('/profile');
                }else{
                    if(user){
                        bcrypt.compare(currPass, user.password, function(err,result){
                            if(result){
                                if(newPass1 == newPass2){
                                    const saltRounds = 10;
                                    
                                    bcrypt.hash(newPass1, saltRounds, (err,hashedPass)=>{
                                        if(hashedPass){
                                            var update = {
                                                $set : {
                                                    name:name,
                                                    password: hashedPass,
                                                    address: address
                                                }
                                            }
                                            
                                            userModel.findByIdAndUpdate({_id:req.session.user}, update,{new:true}, function(err,result){
                                                if(err){
                                                    throw err;
                                                }else{
                                                    console.log(user);
                                                    req.flash('success_msg','Password Updated!');
                                                    res.redirect('/profile');
                                                }
                                            })
                                        }
                                        else{
                                            req.flash('error_msg', 'Error in changing password');
                                            res.redirect('/profile');
                                        }
                                    })
                                }else{
                                    req.flash('error_msg', 'Passwords do not match.');
                                    res.redirect('/profile');
                                }
                            }
                        })
                    }
                }    
            })
        }
}

exports.deleteUser = function(req,res){
    
}