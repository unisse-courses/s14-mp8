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

exports.getAllProducts = function(sort, next){
    productModel.find({}).sort(sort).exec(function(err,result){
       if(err) throw err;
        var menuObjects = [];
        
        result.forEach(function(doc){
           menuObjects.push(doc.toObject()); 
        });
        
        next(menuObjects);
    });
}