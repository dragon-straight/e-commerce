const Order = require('../order');

exports.get_Order = () =>{
  return Order.find({isDeleted: false});
};

exports.get_Order_By_ID = id => {
  return Order.findOne({isDeleted: false, _id: id});
};