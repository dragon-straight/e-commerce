const orderDao = require('../models/dao/orderDao');

exports.order_list= async function(req,res)
{
    const order = await orderDao.get_order();

    res.render('orders/list', { pageTitle: 'Danh sách hóa đơn', orderList: order});
};


exports.order_add=function(req,res)
{
    res.render('orders/add', { pageTitle: 'Thêm hóa đơn' });
};