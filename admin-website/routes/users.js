var express = require('express');
var router = express.Router();
const hbs = require('express-handlebars');

router.get('/list', function(req, res, next) {
  res.render('users/list', { pageTitle: 'Danh sách tài khoản' });
});
router.get('/add', function(req, res, next) {
  res.render('users/add', { pageTitle: 'Thêm tài khoản' });
});

router.get('/edit', function(req, res, next) {
  res.render('users/edit', { pageTitle: 'Chỉnh sửa tài khoản' });
});
module.exports = router;
