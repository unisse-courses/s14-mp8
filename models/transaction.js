const mongoose = require('./connection');

const transactionSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref:"users", required: [true, "No User"]},
    totalQty: {type: Number},
    totalPrice: {type : Number},
    dateOrdered: { type: Date, required: [true, "No date provided"]}
},{
     toObject: {
       virtuals: true,
     },
     toJSON: {
       virtuals: true,
     }
});

const transactionModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionModel;