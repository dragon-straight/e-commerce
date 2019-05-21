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

router.get('/order/update/:id', ordersController.order_update_get);

router.post('/order/update/:id', ordersController.order_update_post);

router.get('/items/list',item_controller.item_list);

router.get('/items/add',item_controller.item_add_get);

router.post('/items/add',item_controller.item_add_post);

router.get('/items/update/:id',item_controller.item_update_get);

router.post('/items/update/:id',item_controller.item_update_post);

router.get('/items/delete/:id',item_controller.item_delete);

router.get('/users/list',usersController.user_list);

router.get('/users/add',usersController.user_add_get);

router.post('/users/add',usersController.user_add_post);

router.get('/users/update/:id',usersController.user_update_get);

router.post('/users/update/:id',usersController.user_update_post);

router.get('/users/delete/:id',usersController.user_delete);

//Category
router.get('/category/list',categoryController.category_list);
router.get('/category/stall',categoryController.category_stall);
router.get('/category/add',categoryController.category_add_get);
router.get('/category/:id',categoryController.category_edit);
router.post('/category/add',categoryController.category_add_post);
router.get('/category/delete/:id',categoryController.category_delete);
router.post('/category/:id',categoryController.category_edit_post);

//Manufacturer
router.get('/manufacturer/list',manufacturerController.manufacturer_list);
router.get('/manufacturer/add',manufacturerController.manufacturer_add_get);
router.get('/manufacturer/:id',manufacturerController.manufacturer_edit);
router.post('/manufacturer/add',manufacturerController.manufacturer_add_post);
router.get('/manufacturer/delete/:id',manufacturerController.manufacturer_delete);
router.post('/manufacturer/:id',manufacturerController.manufacturer_edit_post);

module.exports = router;
