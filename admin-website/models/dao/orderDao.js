const Order = require('../order');

exports.get_order = () =>{
  return Order.find({isDeleted: false});
};
