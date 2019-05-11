const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';

const Product = require('../product');
const Category = require('../category');
const Manufacturer = require('../manufacturer');
const Customer = require('../customer');
const Order = require('../order');
const Admin = require('../admin');

mongoose.connect(mongoDB);
//Tìm NSX
exports.get_ID_Manufacturer = Name =>{
    var abc = 'a';
    Manufacturer.findOne({name: Name}, '_id', function(err,id){
        if(err) throw err;
        abc = id;
        console.log(id);
    });
    console.log(abc);
};