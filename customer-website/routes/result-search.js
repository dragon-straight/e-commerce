var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('product/result-search', { pageTitle: 'Kết quả tìm kiếm' });
});

module.exports = router;
