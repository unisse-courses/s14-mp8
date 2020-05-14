const router = require('express').Router();

const cartController = require('../controllers/cartController');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/', isPrivate, function(req,res){
    res.render('cart', {
        Title: 'Cart',
        user : req.session.name
    });
});

module.exports = router;