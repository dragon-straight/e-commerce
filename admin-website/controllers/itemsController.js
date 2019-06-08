const Product = require('../models/product');
const Manufacturer=require('../models/manufacturer');
const Category=require('../models/category');
const productDao = require('../models/dao/productDao');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var mongoose = require('mongoose');
var async = require('async');

exports.item_list = async function(req,res)
{
    const name = req.user.info.name;
    const list = productDao.get_Product_List();
    res.render('items/list',{
        pageTitle: 'Danh sách sản phẩm',
        productList: await list,
        nameAdmin: name
    });
};

exports.item_add_get = async function(req,res,next)
{
    const name = req.user.info.name;
    const manufacturers = productDao.get_Manufacturer();
    const categories = productDao.get_Category();
    res.render('items/add', { pageTitle: 'Thêm sản phẩm',
        manufacturers: await manufacturers,
        categories: await categories,
        nameAdmin: name
    });
};

exports.item_add_post = function(req,res,next){
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        let product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            category: req.body.category,
            img: '/img/'+req.body.img,
            price: req.body.price,
            status: true,
            info: req.body.info,
            isDeleted: false
            });
        product.save(function(error){
            if(error) throw error;
            res.redirect('list');
        });
    });
};

exports.item_update_get = async function(req,res) {
    const productInfo = await productDao.get_Product_By_Id(req.params.id);
    const manufacturers = productDao.get_Manufacturer();
    const categories = productDao.get_Category();
    const name= req.user.info.name;
    res.render('items/update', { pageTitle: 'Cập nhật sản phẩm',
        product: productInfo[0],
        manufacturers: await manufacturers,
        categories: await categories,
        nameAdmin: name
    });
};
exports.item_update_post = function(req,res,next) {
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        var id = mongoose.Types.ObjectId(req.params.id);
        Product.findOne({_id:id}, function(err,foundProduct){
            if(err) {
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundProduct){
                    res.status(404).send();
                }else{
                    foundProduct.name = req.body.name;
                    foundProduct.manufacturer = req.body.manufacturer;
                    foundProduct.category = req.body.category;
                    foundProduct.img = '/img/'+req.body.img;
                    foundProduct.price = req.body.price;
                    foundProduct.status = true;
                    foundProduct.info = req.body.info;

                    foundProduct.save(function (err) {
                        if(error) throw error;
                        res.redirect('../list');
                    });
                }
            }
        })
    });
};

exports.item_delete = function(req,res){
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
        var id = mongoose.Types.ObjectId(req.params.id);
        Product.findOne({_id:id}, function(err,foundProduct){
            if(err) {
                console.log(err);
                res.status(500).send();
            }else{
                if(!foundProduct){
                    res.status(404).send();
                }else{
                    foundProduct.isDeleted = true;
                    foundProduct.save(function (err) {
                        if(error) throw error;
                        res.redirect('../list');
                    });
                }
            }
        })
    });
};

exports.item_change_block = async (req, res) => {
  const product =  await productDao.get_Product_By_Id(req.params.id);
  //console.log(product);
  if(!product)
      return;

    let data = {isOn: product.status};

    product.status = !product.status;

  product.save(err => {
     if(err) throw  err;
     data.isOn = product.status;
     res.json(data);
  });
};