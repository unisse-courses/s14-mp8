const router = require('express').Router();

const userController = require('../controllers/userController');

const { registerValidation, loginValidation } = require('../validators.js');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

// GET login to display login page
router.get('/login',isPublic,(req, res) => {
  res.render('login', {
    Title: 'Login',
  });
});

// GET register to display registration page
router.get('/register',isPublic, (req, res) => {
  res.render('register', {
    Title: 'Registration',
  });
});

//GET editProfile page to display--------------------------------------
router.get('/profile', isPrivate, (req, res) => {
  res.render('profile', {
    user : req.session.name,
    Title: 'Edit Profile',
  });
});
//---------------------------------------------------------------------

// POST methods for form submissions
router.post('/register',isPublic, registerValidation, userController.registerUser);
router.post('/login',isPublic, loginValidation, userController.loginUser);

//-------------------------------------------------------------------
//https://stackoverflow.com/questions/53830114/how-to-update-user-details-according-to-this-model-and-controller-in-node-js-exp
router.param('userId', function (req, res, next, id) {
  User.findOne(id, function (err, user) {
      if (err) {
          next(err);
      } else if (user) {
          // When it finds user information, bind that to request object, which will be used in the other middlewares.
          req.user = user;
          next();
      } else {
          next(new Error('failed to load user'));
      }
  });
});
router.post('/profile', isPrivate, userController.editUser);
//-------------------------------------------------------------------

// logout
router.get('/logout',isPrivate, userController.logoutUser);

module.exports = router;
