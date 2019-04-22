var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

router.get('/stall', function(req, res, next) {
    res.render('category/stall', { pageTitle: 'Quản lý gian hàng' });
});

module.exports = router;
