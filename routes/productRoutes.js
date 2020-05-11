const router = require('express').Router();

const productController = require('../controllers/productController');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');


//GETS
router.get('/', productController.getMenu);

//POSTS

router.post('/addItem', productController.addItem);



module.exports = router;