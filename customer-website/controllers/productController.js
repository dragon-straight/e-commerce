const Product = require('../models/product');
const async = require('async');

exports.product_list = function(req, res) {
    Product.find(function(err, result) {
        res.render('product/list', { pageTitle: 'Danh sách sản phẩm',products: result });
    });
};

exports.product_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: product create GET');
};

exports.product_viewProduct = function(req, res) {
    Product.findById(req.params.id,function(err,result){
    Product.find({manufacturer:result.manufacturer},function(err, items) {

    // Successful, so render.
    //console.log(result.name);
   res.render('product/single-product', { pageTitle: 'Chi tiết sản phẩm', product: result,items:items} ); 
    });
});
};

exports.product_search = function(req, res) {
    res.render('product/result-search', { pageTitle: 'Kết quả tìm kiếm' });
};

exports.product_cart = function(req, res){
    res.render('product/cart', { pageTitle: 'Giỏ hàng' });
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

