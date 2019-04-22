var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

router.get('/list', function(req, res, next) {
    res.render('orders/list', { pageTitle: 'Danh sách đơn hàng' });
});
router.get('/add', function(req, res, next) {
    res.render('orders/add', { pageTitle: 'Thêm đơn hàng' });
});

router.get('/edit', function(req, res, next) {
    res.render('orders/edit', { pageTitle: 'Chỉnh sửa đơn hàng' });
});
module.exports = router;
