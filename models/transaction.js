const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://Broqzzz:admin@ccapdev-ohkor.mongodb.net/MilkTeaLabs?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const transactionSchema = new mongoose.Schema({
    order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }],
    dateOrdered: { type: Date, required: [true, "No date provided"] },
    status: { type: String, enum: ["Finished", "In Transit", ], required: true }
});

module.exports = mongoose.model('transaction', transactionSchema);