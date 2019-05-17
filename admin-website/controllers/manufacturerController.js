
exports.manufacturer_list=function(req,res)
{
    res.render('manufacturer/list', { pageTitle: 'Danh sách nhà sản xuất' });
}

exports.manufacturer_add=function(req,res)
{
    res.render('manufacturer/add', { pageTitle: 'Thêm nhà sản xuất' });
}