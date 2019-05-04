
exports.item_list=function(req,res)
{
    res.render('items/list', { pageTitle: 'Danh sách sản phẩm' });
}

exports.item_add=function(req,res)
{
    res.render('items/add', { pageTitle: 'Thêm sản phẩm' });
}