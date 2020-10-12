const router = require('express').Router();

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/', (req, res) => {
  res.render('home', {
      user: req.session.name
    });
});

router.get('/login', (req, res) => {
  res.render('login', { 
      user: req.session.name
    });
});

router.get('/register', (req, res) => {
  res.render('register', { 
      user: req.session.name
    });
});


module.exports = router;
