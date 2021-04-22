const router = require('express').Router();

const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);


module.exports = router;