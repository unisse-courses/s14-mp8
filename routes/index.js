const router = require('express').Router();

const { isPublic, isPrivate } = require('../middlewares/checkAuth');

router.get('/', isPublic , (req, res) => {
  res.render('home', { Title: 'Milk Tea Labs'});
});

module.exports = router;
