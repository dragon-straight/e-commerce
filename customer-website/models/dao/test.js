const mongoose = require('mongoose');
const mongoDB = '';

const Product = require('./product.js');
const Category = require('./category.js');
const Manufacturer = require('./manufacturer.js');

mongoose.connect(mongoDB, function(error){
    if(error)
        throw error;

    console.log('Successfully connected');

});
