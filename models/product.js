const mongoose = require('mongoose');

const databaseURL = 'mongodb+srv://Broqzzz:admin@ccapdev-ohkor.mongodb.net/MilkTeaLabs?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, "No name provided"]},
    description: { type: String, required: [true, "No description provided"]},
    price: { type: Number,required: [true, "No price provided"]},
    img: { type: String, required:[true, "No image"]},
}, {
     toObject: {
       virtuals: true,
     },
     toJSON: {
       virtuals: true,
     }
});

module.exports = mongoose.model('product', productSchema);