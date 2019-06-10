const express = require('express');
const Product = require('../models/product');
const router = express.Router() ;
const async = require('async');

//Require controller modules
const productController = require('../controllers/productController');

//GET product list page by Manufacturer
router.get('/manufacturer/:id', productController.product_viewByManufacturer);

//GET product list page by Category
router.get('/category/:id', productController.product_viewByCategory);

//GET view product page
router.get('/single-product/:id',productController.product_viewProduct);
router.post('/incView/:id',productController.product_incView);
router.post('/single-product/:id',productController.product_comment_post);


//GET result-search page
router.get('/result-search', productController.product_search);

//GET cart page
router.get('/cart', productController.product_cart);

//GET add product to cart
router.get('/cart/add', productController.product_addToCart);

//GET remove product from cart
router.get('/cart/remove', productController.product_removeFromCart);

//GET change quantity of cart
router.get('/cart/change', productController.product_changeQuantity);

module.exports = router;