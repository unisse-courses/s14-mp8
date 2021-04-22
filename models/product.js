const mongoose = require('./connection');

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

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;


//exports.addProduct = function(obj,next){
//    const product = new productModel(obj);
//    
//    product.save(function(err,product){
//        next(err,product);
//    });
//};