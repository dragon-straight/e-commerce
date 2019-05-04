
exports.user_list=function(req,res)
{
    res.render('users/list', { pageTitle: 'Danh sách tài khoản' });
}

exports.user_add=function(req,res)
{
    res.render('users/add', { pageTitle: 'Thêm tài khoản' });
}