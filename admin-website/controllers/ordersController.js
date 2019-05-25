const orderDao = require('../models/dao/orderDao');
const mongoose = require('mongoose');
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

exports.order_delete = async function(req, res){
    const orderInfo = await orderDao.get_Order_By_ID(req.params.id);

    if(orderInfo == null)
        res.status(404).send();

    orderInfo.isDeleted = true;

    orderInfo.save(err => {
        if(err) throw err;
        res.redirect('../list');
    });
};

exports.order_getCustomerInfo = async (req,res) =>{
    const customerInfo = await orderDao.get_CustomerInfo_By_ID(req.params.id);
    /*res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(customerInfo));*/
    res.json(customerInfo);
};

exports.order_getProductInfo = async (req,res) => {
    const productInfo = await orderDao.get_Order_By_ID(req.params.id);
    res.json(productInfo);
};