var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('customer/login', { pageTitle: 'Đăng nhập' });
});

module.exports = router;
