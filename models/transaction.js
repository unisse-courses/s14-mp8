const mongoose = require('./connection');

mongoose.set('useCreateIndex', true);

const transactionSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }],
    dateOrdered: { type: Date, required: [true, "No date provided"] },
    status: { type: String, enum: ["Finished", "In Transit", "Processing"], required: true }
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