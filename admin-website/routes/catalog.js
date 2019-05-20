var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

var categoryController=require('../controllers/categoryController');
var usersController=require('../controllers/usersController');
var item_controller=require('../controllers/itemsController');
var ordersController=require('../controllers/ordersController');
var reportController=require('../controllers/reportsController');
var manufacturerController=require('../controllers/manufacturerController');

router.get('/',function(req,res) {
    res.render('dashboard', { pageTitle: 'Overview' });
});

router.get('/report/items',reportController.report_item);

router.get('/report/profit',reportController.report_profit);

router.get('/orders/list',ordersController.order_list);

router.get('/orders/add',ordersController.order_add);

router.get('/items/list',item_controller.item_list);

router.get('/items/add',item_controller.item_add_get);

router.post('/items/add',item_controller.item_add_post);

router.get('/items/update/:id',item_controller.item_update_get);

router.post('/items/update/:id',item_controller.item_update_post);

router.get('/users/list',usersController.user_list);

router.get('/users/add',usersController.user_add);

router.get('/category/stall',categoryController.category_stall);

router.get('/category/add',categoryController.category_add);

router.get('/category/list',categoryController.category_list);


router.get('/manufacturer/list',manufacturerController.manufacturer_list);

router.get('/manufacturer/add',manufacturerController.manufacturer_add);

module.exports = router;
