var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('product/cart', { pageTitle: 'Giỏ hàng' });
});

module.exports = router;
