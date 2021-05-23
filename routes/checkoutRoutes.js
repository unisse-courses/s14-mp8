const router = require('express').Router();

const checkoutController = require('../controllers/checkoutController');

router.get('/', checkoutController.getCheckout);

router.post('/confirmOrder', checkoutController.confCheckout);

module.exports = router;
