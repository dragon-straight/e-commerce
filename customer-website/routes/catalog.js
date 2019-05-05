const express = require('express');
const router = express.Router();

//Require controller modules
const product_Controller = require('../controllers/productController');

//GET product list page
router.get('/list', product_Controller.product_list);

//GET view product page
router.get('/single-product', product_Controller.product_viewProduct);

//GET forgot password page
router.get('/result-search', product_Controller.product_search);

//GET cart page
router.get('/cart', product_Controller.product_cart);

module.exports = router;