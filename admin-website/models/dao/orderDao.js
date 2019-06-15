const Order = require('../order');
const Customer = require('../customer');

exports.get_Order = () =>{
  return Order.find({isDeleted: false});
};

exports.get_Order_By_ID = id => {
  return Order.findOne({isDeleted: false, _id: id});
};

exports.get_CustomerInfo_By_ID = async id => {
  const order = await Order.findById(id,'customer').populate('customer');
  return await Customer.findById(order.customer);
};

exports.get_ReceiverInfo_By_ID = async id => {
  return await Order.findById(id,'name address email sdt');
};

/*exports.get_Cart_By_ID = id =>{
  return Order.findById(id,'cart');
};*/