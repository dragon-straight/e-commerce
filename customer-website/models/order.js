const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
    customer: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    payment: {type: String, enum:['Ship COD','Credit card']},
    totalPrice: Number,
    productList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;