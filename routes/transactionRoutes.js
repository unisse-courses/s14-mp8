const router = require('express').Router();

const transactionController = require('../controllers/transactionController');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

//GET
router.get('/', function(req,res){
    res.render('history', {
        Title: 'Transaction History',
        user : req.session.name,
    });
});

//POSTS


module.exports = router;