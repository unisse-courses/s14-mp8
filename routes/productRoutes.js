const router = require('express').Router();

const productController = require('../controllers/productController');


//GETS
router.get('/', productController.getMenu);

//POSTS
router.post('/admin/addItem', productController.addItem);
router.post('/addToCart/:id', productController.addToCart);


module.exports = router;