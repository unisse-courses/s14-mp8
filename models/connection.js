// This file is initializing the mongodb connection
// and exporting it for use in all other files through the module.exports

const mongoose = require('mongoose');

const databaseURL ='mongodb+srv://Broqzzz:H1DjJw7tqVaQqBy6@ccapdev-ohkor.mongodb.net/MilkTeaLabs?retryWrites=true&w=majority';

const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(databaseURL, options);

module.exports = mongoose;