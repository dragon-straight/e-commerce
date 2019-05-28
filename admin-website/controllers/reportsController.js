
exports.report_item=function(req,res)
{
    const name = req.user.info.name;
    res.render('report/items', { pageTitle: 'Thống kê sản phẩm và doanh thu',
    nameAdmin: name});
}

exports.report_profit=function(req,res)
{
    const name = req.user.info.name;
    res.render('report/profit', { pageTitle: '',
    nameAdmin: name});
}