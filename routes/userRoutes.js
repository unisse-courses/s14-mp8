const router = require('express').Router();

const userController = require('../controllers/userController');

const { registerValidation, loginValidation } = require('../validators.js');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');


router.get('/login', userController.getLoginPage); // get the login page
router.get('/register', userController.getRegisterPage); // get the register page

router.post('/register', registerValidation, userController.registerUser); //register new users
router.post('/login', loginValidation, userController.loginUser); //login users

router.get('/logout', userController.logoutUser);// logout users

router.get('/profile', userController.getUser);
//router.post('/updateUser/:id', userController.updateUser)

module.exports = router;
