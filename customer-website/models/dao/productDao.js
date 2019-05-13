
const Product = require('../product');
const Category = require('../category');
const Manufacturer = require('../manufacturer');
const Customer = require('../customer');
const Order = require('../order');
const Admin = require('../admin');

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


function getRandom(min, max){
  return Math.ceil(Math.random() * (max-min) + min);
};

//Slider
exports.get_Random_Product = () =>{
    let product = Product.countDocuments({}).then(count => {
            const skipRecord = getRandom(count - 7, count - 2);
            return Product.find({isDeleted: false}, 'id name price img').skip(skipRecord);
        });
    return product;
};

//Latest Product
exports.get_LatestProduct = () => {
    return Product.find({isDeleted: false}).sort({releaseDate: -1}).limit(7);
};

//Get manufacturer
exports.get_Manufacturer = () =>{
    return Manufacturer.find({isDeleted: false}, 'id name img');
};

//Get category
exports.get_Category = () => {
  return Category.find({isDeleted: false}, 'id name');
};




