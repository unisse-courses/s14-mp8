const router = require('express').Router();

const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);
router.get('/checkout', cartController.checkout);

module.exports = router;