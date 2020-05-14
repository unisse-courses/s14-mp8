const transactionModel = require('../models/transaction');

exports.getTransaction = function(req,res){
    transactionModel.getOneTransaction(req.body.transactionID,function(transaction){
       res.render('history', {transaction}); 
    });
}
    