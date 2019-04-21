var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
    res.send("List items");
});
router.get('/add', function(req, res, next) {
    res.send("Add items");
});

router.get('/edit', function(req, res, next) {
    res.send("edit items");
});
module.exports = router;
