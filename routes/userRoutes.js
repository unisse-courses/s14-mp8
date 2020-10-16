const router = require('express').Router();

const userController = require('../controllers/userController');

const { registerValidation, loginValidation } = require('../validators.js');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

// POST methods for form submissions
router.post('/register',isPublic, registerValidation, userController.registerUser);
router.post('/login',isPublic, loginValidation, userController.loginUser);

router.get('/logout',isPrivate, userController.logoutUser);

module.exports = router;
