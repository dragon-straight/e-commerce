var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

router.get('/items', function(req, res, next) {
    res.render('report/items', { pageTitle: 'Thống kê sản phẩm' });
});
router.get('/profit', function(req, res, next) {
    res.render('report/profit', { pageTitle: 'Thống kê doanh thu' });
});

module.exports = router;
