const router = require('express').Router();

const productController = require('../controllers/productController');


//GETS
router.get('/', productController.getMenu);

//POSTS
router.post('/admin/addItem', productController.addItem);


module.exports = router;