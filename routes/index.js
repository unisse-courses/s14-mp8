const router = require('express').Router();

const homeController = require('../controllers/homeController');

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/', homeController.getHome);

router.get('/checkout', (req,res)=>{
   res.render('checkout', {
       user: req.session.name
   });
});


router.get('/admin', (req, res) => {
  res.render('adminlog', {
    user: req.session.name,
    layout : 'adminlog'
  });
})

module.exports = router;
