const router = require('express').Router();

const productController = require('../controllers/productController');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');


//GETS
router.get('/', isPublic, productController.getMenu);

//POSTS



module.exports = router;