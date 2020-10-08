const bcrypt = require('bcrypt');

const userModel = require('../models/user');

const {validationResult} = require('express-validator');



exports.registerUser = function(req,res){
  const errors = validationResult(req);
    
    if(errors.isEmpty()){
        const {name, username, password1, address} = req.body;
        
        userModel.getOne({username : username}, function(err, result){
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
                   userModel.create(newUser, function(err, user){
                       if(err){
                           console.log(err);
                           req.flash('error_msg', 'Could not create user. Please Try Again!');
                           res.redirect('/register');
                       }else{
                           req.flash("success_msg", 'You are now registered!');
                           res.redirect('/login');
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

    userModel.getOne({ username: username }, (err, user) => {
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

            res.redirect('/');
          } else {
            // passwords don't match
            req.flash('error_msg', 'Incorrect password. Please try again.');
            res.redirect('/login');
          }
        });
        } else {
          // No user found
          req.flash('error_msg', 'Unregistered Email. Please register.');
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
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
};

//----------------------------------------------------------
exports.editUser = (req, res, next) => {
  
  console.log(req.body);

  // get user objects to validate password
  // if match get one and update 
  // else redirect to profile page with error message for wrong password

  userModel.getAndUpdate(
    { _id: req.session.user },
    { address: req.body.address },
    { new: true },
    (err, result) => {
      if (err) {
        req.flash('error_msg', 'Something happened! Please try again.');
        res.redirect('/login');
      } else {
        try {
          if (user) {
            bycrypt.compare(password, user.password, (err, result) => {
              if (result) {
                req.session.user = user._id;
                req.session.address = user.address;
                res.status(200).json({
                  message: "Address Successfully Updated",
                })

                res.redirect('/profile');
              } else {
                req.flash('error_msg', 'Passwords do not match');
                res.redirect('/profile');
              }
            });
          }
        } catch (e) {
          console.log(e);
        }
          

      }
      console.log(result);
      //if successful redirect to profile but send suc message
      // res.status(200).json({
      //    message: "Address Successfully Updated",
      // })
    }
  )
    // .then((result) => {
    //   console.log(result);
    // })

    // .then(() =>{
    //   res.status(200).json({
    //     message: "Address Successfully Updated",
    //   })
    // })

    // .catch((err) => {
    //   console.log(err);
    //   res.status(500).json({
    //     error: err,
    //   });
    // });
};