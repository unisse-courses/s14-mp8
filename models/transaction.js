const mongoose = require('mongoose');

const databaseURL ='mongodb+srv://Broqzzz:admin@ccapdev-ohkor.mongodb.net/MilkTeaLabs?retryWrites=true&w=majority';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.connect(databaseURL, options);

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


const transactionModel = mongoose.model('Transaction', transactionSchema);

exports.getOneTransaction = function(transId, next){
    transactionModel.find({transId}).exec(function(err,result){
       if(err){
           throw err;
       } 
        else{
            next(result);
        }
    });
}