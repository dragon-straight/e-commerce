
const Product = require('../product');
const Category = require('../category');
const Manufacturer = require('../manufacturer');
const Customer = require('../customer');
const Order = require('../order');
const Admin = require('../admin');

//Get product list by manufacturer id
exports.get_Product_By_Manufacturer = async id =>{

    /*let product = Manufacturer.find({_id: id, isDeleted: false}).then(manufacturerObject => {
       return Product.find({manufacturer: manufacturerObject, isDeleted: false}, '_id name img price');
    });
    return product;*/

    return Product.find({manufacturer: id, isDeleted: false}, '_id name img price status');
};

//Get product list by category id
exports.get_Product_By_Category = async id =>{

    /*let product = Category.find({_id: id, isDeleted: false}).then(categoryObject => {
        return Product.find({category: categoryObject, isDeleted: false}, '_id name img price');
    });
    return product;*/


    return Product.find({category: id, isDeleted: false}, '_id name img price status');
};


//Get top 3 most sold product list
exports.get_Most_Sold = () => {
    return Product.find({isDeleted: false}, '_id name img price status').sort({sale: -1}).limit(3);
};

//Get top 3 most viewed product list
exports.get_Most_Viewed = () => {
    return Product.find({isDeleted: false}, '_id name img price status').sort({viewed: -1}).limit(3);
};

function getRandom(min, max){
  return Math.ceil(Math.random() * (max-min) + min);
};

//Slider
exports.get_Random_Product = async () =>{
    /*let product = Product.countDocuments().then(count => {
            const skipRecord = getRandom(count - 7, count - 2);
            return Product.find({isDeleted: false}, '_id name price img').skip(skipRecord);
        });
    return product;*/

    const count = await Product.countDocuments();
    const skipRecord = await getRandom(count - 7, count - 2);

    return  Product.find({isDeleted: false}, '_id name price img status').skip(skipRecord);
};

//get 7 Latest Product
exports.get_LatestProduct = () => {
    return Product.find({isDeleted: false}, '_id name img price status').sort({releaseDate: -1}).limit(7);
};

//Get manufacturer
exports.get_Manufacturer = () =>{
    return Manufacturer.find({isDeleted: false}, '_id name img');
};

//Get category
exports.get_Category = () => {
  return Category.find({isDeleted: false}, '_id name');
};

//Get Product by id
exports.get_Product_By_Id = id => {
   return Product.find({_id: id, isDeleted: false}, '_id name img manufacturer price info');
};

//Get related product
exports.get_Related_Products =  manufacturerObject =>{
  return Product.find({manufacturer: manufacturerObject, isDeleted: false}, '_id name img price');
};


//Search product with like name
exports.search_name = (name) =>{
   return Product.find({name: {$regex: name, $options: 'i'}});
};

//Search product with price
exports.search_price = (price) =>{
    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({price: {$gte: range[0]}});
    }
    else
    {
        const range = price.split('_');
        return Product.find({price: {$gte: range[0], $lte: range[1]}});
    }
};

//Search product with name and price
exports.search_name_price = (name, price) => {
    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0]}});
    }
    else
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0], $lte: range[1]}});
    }
};

//Search product with name and category
exports.search_name_category = (name, category) =>
{
  return Product.find({name:{$regex: name, $options: 'i'}, category: category});
};


//Search product with name and manufacturer
exports.search_name_manufacturer = (name, manufacturer) =>
{
    return Product.find({name:{$regex: name, $options: 'i'}, manufacturer: manufacturer});
};

//Search product with price and category
exports.search_price_category = (price, category) => {
    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({category: category, price: {$gte: range[0]}});
    }
    else
    {
        const range = price.split('_');
        return Product.find({category: category, price: {$gte: range[0], $lte: range[1]}});
    }
};

//Search product with price and manufacturer
exports.search_price_manufacturer = (price, manufacturer) => {
    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({manufacturer: manufacturer, price: {$gte: range[0]}});
    }
    else
    {
        const range = price.split('_');
        return Product.find({manufacturer: manufacturer, price: {$gte: range[0], $lte: range[1]}});
    }
};

//Search product with category and manufacturer
exports.search_category_manufacturer = (category, manufacturer) => {
    return Product.find({category: category, manufacturer: manufacturer});
};


//Search product with name price category
exports.search_name_price_category = (name, price, category) => {

    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0]}, category: category});
    }
    else
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0], $lte: range[1]}, category: category});
    }
};

//Search product with name price manufacturer
exports.search_name_price_manufacturer = (name, price, manufacturer) => {

    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0]}, manufacturer: manufacturer});
    }
    else
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0], $lte: range[1]}, manufacturer: manufacturer});
    }
};

//Search product with name category manufacturer
exports.search_name_category_manufacturer = (name, category, manufacturer) => {
  return Product.find({name: {$regex: name, $options: 'i'}, category: category, manufacturer: manufacturer});
};

//Search product with price category manufacturer
exports.search_price_category_manufacturer = (price, category, manufacturer) => {
    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({price: {$gte: range[0]}, category: category, manufacturer: manufacturer});
    }
    else
    {
        const range = price.split('_');
        return Product.find({price: {$gte: range[0], $lte: range[1]}, category: category, manufacturer: manufacturer});
    }
};

//Search product with name, price, category, manufacturer
exports.search_name_price_category_manufacturer = (name, price, category, manufacturer) => {
    if(price == '1000_INF')
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0]}, category: category, manufacturer: manufacturer});
    }
    else
    {
        const range = price.split('_');
        return Product.find({name: {$regex: name, $options: 'i'}, price: {$gte: range[0], $lte: range[1]}, category: category, manufacturer: manufacturer});
    }
};