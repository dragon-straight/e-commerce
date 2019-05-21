const orderDao = require('../models/dao/orderDao');

exports.order_list= async function(req,res)
{
    const order = await orderDao.get_Order();
    res.render('orders/list', { pageTitle: 'Danh sách hóa đơn', orderList: order});
};

exports.order_add=function(req,res)
{
    res.render('orders/add', { pageTitle: 'Thêm hóa đơn' });
};

exports.order_update_get= async function(req, res){
    const orderInfo = await orderDao.get_Order_By_ID(req.params.id);
    res.render('orders/update', { pageTitle: 'Cập nhật đơn hàng',
        order: orderInfo,
    });
};

exports.order_update_post = async function(req, res){
  const orderInfo = await orderDao.get_Order_By_ID(req.params.id);

  if(orderInfo == null)
      res.status(404).send();

  orderInfo.totalPrice = req.body.totalPrice;
  orderInfo.status = req.body.status;
  orderInfo.payment = req.body.payment;
  
  orderInfo.save(err => {
     if(err) throw err;
     res.redirect('../list');
  });
};