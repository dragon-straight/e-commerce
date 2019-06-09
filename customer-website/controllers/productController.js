const Product = require('../models/product');
const productDao = require('../models/dao/productDao');
const Comment= require('../models/comment')
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var mongoose = require('mongoose');
var async = require('async');

exports.product_viewByManufacturer = async function(req, res) {
    const list = productDao.get_Product_By_Manufacturer(req.params.id);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm',
        productList: await list,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user
    });
};

exports.product_viewByCategory = async function(req, res) {
    /*productDao.get_Product_By_Category(req.params.id).then(result =>{
        list = result;
        return productDao.get_Manufacturer();
    }).then(result => {
        manufacturer = result;
        return productDao.get_Category();
    }).then(result => {
        category = result;
        res.render('product/list', {
            pageTitle: 'Danh sách sản phẩm',
            productList: list,
            manufacturerList: manufacturer,
            categoryList: category
        });
    })*/

    const list = productDao.get_Product_By_Category(req.params.id);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    res.render('product/list', {
        pageTitle: 'Danh sách sản phẩm',
        productList: await list,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user
    });
};

exports.product_search = async function(req, res) {
    /*productDao.get_Manufacturer().then(result => {
        manufacturer = result;
        return productDao.get_Category();
    }).then(result => {
        category = result;
        res.render('product/result-search', {
            pageTitle: 'Kết quả tìm kiếm',
            manufacturerList: manufacturer,
            categoryList: category,
        });
    });*/

exports.product_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product create GET');
};



exports.product_search = async (req, res) => {
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    let productList;

    //name
    if(req.query.name && !req.query.price && !req.query.category && !req.query.manufacturer)
        productList = await productDao.search_name(req.query.name);
    //price
    else if(!req.query.name && req.query.price && !req.query.category && !req.query.manufacturer)
        productList = await productDao.search_price(req.query.price);
    //category
    else if(!req.query.name && !req.query.price && req.query.category && !req.query.manufacturer)
        productList = await productDao.get_Product_By_Category(req.query.category);
    //manufacturer
    else if(!req.query.name && !req.query.price && !req.query.category && req.query.manufacturer)
        productList = await productDao.get_Product_By_Manufacturer(req.query.manufacturer);
    //name and price
    else if(req.query.name && req.query.price && !req.query.category && !req.query.manufacturer)
        productList = await productDao.search_name_price(req.query.name, req.query.price);

    console.log(productList);

    res.render('product/result-search', {
        pageTitle: 'Kết quả tìm kiếm',
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user
    });
};

exports.product_cart = async function(req, res){
    /*productDao.get_Manufacturer().then(result => {
        manufacturer = result;
        return productDao.get_Category();
    }).then(result => {
        category = result;
        res.render('product/cart', {
            pageTitle: 'Giỏ hàng',
            manufacturerList: manufacturer,
            categoryList: category,
        });
    });*/

    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    res.render('product/cart', {
        pageTitle: 'Giỏ hàng',
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
    });
};

exports.product_addToCart = function(req, res) {
    res.send('NOT IMPLEMENTED: Add product into cart');
};

exports.product_removeFromCart = function(req, res) {
    res.send('NOT IMPLEMENTED: Remove product form cart');
};

exports.product_changeQuantity = function(req, res){
  res.send('NOT IMPLEMENTED: Change quantity of product in cart');
};

exports.product_viewProduct = async function(req, res)
{
    const productInfo = await productDao.get_Product_By_Id(req.params.id);
    const related =  productDao.get_Related_Products(productInfo[0].manufacturer);
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    const comments=Comment.find({product:productInfo[0]._id});
    let count=Comment.count({product:productInfo[0]._id});

    res.render('product/single-product', {
        pageTitle: 'Chi tiết sản phẩm',
        product: productInfo[0],
        relatedProduct: await related,
        manufacturerList: await manufacturer,
        categoryList: await category,
        curCustomer: req.user,
        comments:await comments,
        count:await count,
    });
};

exports.product_comment_post=async function(req, res){
    await mongoose.connect(mongoDB, function (error) {
        if (error)
            throw error;
        let comment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            customerName: req.body.name,
            email: req.body.email,
           detail:req.body.email,
           product:req.params.id,
           detail:req.body.review,
         });
        comment.save(function (error) {
            res.redirect('../single-product/'+req.params.id);
        });  
})
};

