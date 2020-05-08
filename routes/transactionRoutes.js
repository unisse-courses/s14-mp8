const router = require('express').Router();

const transactionController = require('../controllers/transactionController');

router.post('/history/:id', transactionController.getTransaction);