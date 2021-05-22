const router = require('express').Router();

const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);

router.post('/dec/:id',cartController.decItemCart);
router.post('/inc/:id',cartController.incItemCart);
router.post('/removeItem/:id', cartController.removeItem);





module.exports = router;