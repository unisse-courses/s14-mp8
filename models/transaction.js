const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }],
    dateOrdered: { type: Date, required: [true, "No date provided"] },
    status: { type: String, enum: ["Finished", "In Transit", ], required: true }
},{
     toObject: {
       virtuals: true,
     },
     toJSON: {
       virtuals: true,
     }
});


module.exports = mongoose.model('Transaction', transactionSchema);