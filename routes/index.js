const router = require('express').Router();

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/', (req, res) => {
  res.render('home', {
      user: req.session.name
    });
});


router.get('/cart', (req, res) => {
  res.render('cart', { 
      user: req.session.name
    });
});

router.get('/checkout', (req, res) => {
  res.render('checkout', { 
      user: req.session.name
    });
});



router.get('/admin', (req, res) => {
  res.render('admin', {
    user: req.session.name,
    layout : 'admin'
  });
})

module.exports = router;
