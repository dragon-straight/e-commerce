var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('customer/orders', { pageTitle: 'Lịch sử và trạng thái mua hàng' });
});

module.exports = router;
