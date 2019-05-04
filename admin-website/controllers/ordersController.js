
exports.order_list=function(req,res)
{
    res.render('orders/list', { pageTitle: 'Danh sách hóa đơn' },);
}

exports.order_add=function(req,res)
{
    res.render('orders/add', { pageTitle: 'Thêm hóa đơn' });
}