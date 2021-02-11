const router = require('express').Router();

const userController = require('../controllers/userController');

const { registerValidation, loginValidation } = require('../validators.js');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');


router.get('/logout', userController.logoutUser);

router.post('/register', registerValidation, userController.registerUser);
router.post('/login', loginValidation, userController.loginUser);

module.exports = router;
