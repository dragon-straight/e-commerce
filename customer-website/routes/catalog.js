const express = require('express');
const Product = require('../models/product');
const router = express.Router();
const async = require('async');

//Require controller modules
const product_Controller = require('../controllers/productController');

//GET product list page by Manufacturer
router.get('/manufacturer/:id', product_Controller.product_viewByManufacturer);

//GET product list page by Category
router.get('/category/:id', product_Controller.product_viewByCategory);

//GET view product page
router.get('/single-product/:id',product_Controller.product_viewProduct);
router.post('/single-product/:id',product_Controller.product_comment_post);


//GET result-search page
router.get('/result-search', product_Controller.product_search);

//GET cart page
router.get('/cart', product_Controller.product_cart);

//GET add product to cart
router.get('/cart/add', product_Controller.product_addToCart);

//GET remove product from cart
router.get('/cart/remove', product_Controller.product_removeFromCart);

//GET change quantity of cart
router.get('/cart/change', product_Controller.product_changeQuantity);

module.exports = router;