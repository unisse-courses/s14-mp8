const router = require('express').Router();

const cartController = require('../controllers/cartController');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/', isPublic, function(req,res){
    res.render('cart', {
        Title: 'Cart',
    });
});

module.exports = router;