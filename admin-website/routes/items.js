var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

router.get('/list', function(req, res, next) {
    res.render('items/list', { pageTitle: 'Danh sách sản phẩm' });
});
router.get('/add', function(req, res, next) {
    res.render('items/add', { pageTitle: 'Thêm sản phẩm' });
});

router.get('/edit', function(req, res, next) {
    res.render('items/edit', { pageTitle: 'Chỉnh sửa sản phẩm' });
});
module.exports = router;
