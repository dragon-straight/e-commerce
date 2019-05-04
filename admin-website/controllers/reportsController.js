
exports.report_item=function(req,res)
{
    res.render('report/items', { pageTitle: 'Thống kê sản phẩm và doanh thu' });
}

exports.report_profit=function(req,res)
{
    res.render('report/profit', { pageTitle: '' });
}