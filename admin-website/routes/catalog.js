var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

var categoryController=require('../controllers/categoryController');
var usersController=require('../controllers/usersController');
var item_controller=require('../controllers/itemsController');
var ordersController=require('../controllers/ordersController');
var reportController=require('../controllers/reportsController');

router.get('/',function(req,res) {
    res.render('dashboard', { pageTitle: 'Overview' });
});

router.get('/report/items',reportController.report_item);

router.get('/report/profit',reportController.report_profit);

router.get('/orders/list',ordersController.order_list);

router.get('/orders/add',ordersController.order_add);

router.get('/items/list',item_controller.item_list);

router.get('/items/add',item_controller.item_add);

router.get('/users/list',usersController.user_list);

router.get('/users/add',usersController.user_add);

router.get('/category/stall',categoryController.category_stall);


module.exports = router;