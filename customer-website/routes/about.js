var express = require('express');
var router = express.Router();
const productDao = require('../models/dao/productDao');

/* GET users listing. */
router.get('/', async function(req, res, next) {
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();

    res.render('product/result-search', {
        pageTitle: 'Liên hệ',
        manufacturerList: await manufacturer,
        categoryList: await category,
    });
});

module.exports = router;
