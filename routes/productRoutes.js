const router = require('express').Router();

const productController = require('../controllers/productController');


//GETS
router.get('/', productController.getMenu);

//POSTS
router.post('/addtoCart', productController.addtoCart);
//router.post('/addItem', productController.addItem);
router.post('/admin', productController.addItem);


module.exports = router;