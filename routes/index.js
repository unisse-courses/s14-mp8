const router = require('express').Router();

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/', (req, res) => {
  res.render('home', { 
      Title: 'Home',
      user: req.session.name
    });
});

module.exports = router;
