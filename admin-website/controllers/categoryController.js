
exports.category_stall=function(req,res)
{
    res.render('category/stall', { pageTitle: 'Quản lý gian hàng' });
}

exports.category_list=function(req,res)
{
    res.render('category/list', { pageTitle: 'Danh sách loại sản phẩm' });
}

exports.category_add=function(req,res)
{
    res.render('category/add', { pageTitle: 'Thêm loại sản phẩm' });
}
