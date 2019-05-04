const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/test';

const Product = require('../product.js');
const Category = require('../category.js');
const Manufacturer = require('../manufacturer.js');

mongoose.connect(mongoDB, function(error){
    if(error)
        throw error;

    console.log('Successfully connected');

    const mvcCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: 'TF'
    });

    mvcCategory.save(function (error) {
        if(error) throw error;
        console.log('Category successfully saved');
    });

    const mvcManufacturer = new Manufacturer({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pan'
    });

    mvcManufacturer.save(function(error){
        if(error) throw error;
        console.log('Manufacturer successfully saved');
    });

    const mvcProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: 'Pan Vigor 8 TF',
        manufacturer: mvcManufacturer._id,
        category: mvcCategory._id,
        img: '/abc',
        price: 400000,
        status: true,
        info:'Giày chính hãng\n Chất lượng cao'
    });

    mvcProduct.save(function (error) {
        if(error) throw error;
        console.log('Product successfully saved');
    });

});


