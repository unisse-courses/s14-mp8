const router = require('express').Router();

//Controller Imports  
const cartController = require('../controllers/cartController');
const userController = require('../controllers/userController');
const transactionController = require('../controllers/transactionController');
const productController = require('../controllers/productController');



router.get('/',);


router.post('/add', studentController.create);



//// Finds the students matching the name query from the database and returns the array
//router.post('/search', function(req, res) {
//  var pattern = "^" + req.body.name;
//  studentModel.find({ name: { $regex: pattern } }, function(err, students) {
//    console.log(students);
//    res.send(students);
//  });
//
//});
//
//// Updates a student to a set id number
//router.post('/:id/edit', function(req, res) {
//  var query = {
//    name: req.body.name
//  };
//
//  var update = {
//    $set: { id: '109' }
//  };
//
//  studentModel.findOneAndUpdate(query, update, { new: true }, function(err, user) {
//    if (err) throw err;
//    console.log(user);
//    res.send(user);
//  });
//});
//

module.exports = router;