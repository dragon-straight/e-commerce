const Customer = require('../models/customer');
const customerDao = require('../models/dao/customerDao');
const productDao = require('../models/dao/productDao');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
const Cart = require('../models/cart');
const Order = require('../models/order');
var mongoose = require('mongoose');
var async = require('async');
const passport = require('passport');

exports.forgotPassword_index = function(req, res){
    res.render('customer/forgotPassword', { pageTitle: 'Phục hồi mật khẩu' });
};

exports.customer_orders = async function(req, res) {
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    Order.find({customer: req.user, isAvailable: false},function(err,orders){
        if(err){
            res.render('customer/orders', {
                pageTitle: 'Các đơn hàng',
                manufacturerList: manufacturer,
                categoryList: category,
                curCustomer: req.user,
            });
            return;
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('customer/orders', {
            pageTitle: 'Các đơn hàng',
            manufacturerList: manufacturer,
            categoryList: category,
            curCustomer: req.user,
            orders: orders
        });
    });
};

exports.checkout_get = function(req, res){
    if(!req.session.cart){
        res.redirect('/cart');
    }
    else{
        const manufacturer = productDao.get_Manufacturer();
        const category = productDao.get_Category();
        const cart = new Cart(req.session.cart);
        var errMsg = req.flash('error')[0];
        res.render('customer/checkoutWithCreditCard', {
            pageTitle: 'Thanh toán',
            manufacturerList: manufacturer,
            categoryList: category,
            curCustomer: req.user,
            cartProducts: cart.generateArray(),
            cartTotalPrice: req.session.cart.totalPrice,
            errMsg: errMsg,
            noError: !errMsg
        });
    }
};

exports.checkout_post = function(req, res){
    if(!req.session.cart){
        res.redirect('/cart');
    }
    const cart = new Cart(req.session.cart);
    const stripe = require("stripe")("sk_test_TKy5X1aloFTTY5OBnagOvw7600dk5Ak6Tw");

    stripe.charges.create({
        amount: cart.totalPrice,
        currency: "vnd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: 'Thanh toán bởi '+ req.body.name + ' ' + req.body.email,
    }, function(err, charge) {
        // asynchronously called
        if(err){
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        var order = new Order({
            _id: new mongoose.Types.ObjectId(),
            customer: req.user._id,
            cart: cart,
            payment:'Credit card',
            paymentStripeId: charge.id,
            created: Date.now(),
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            sdt: req.body.sdt,
            isDeleted: false,
            status: 'Chưa giao'
        });

        order.save(function(err,result){
            req.flash('success','Giao dịch thành công !! Cám ơn bạn :D !!');
            req.session.cart = null;
            res.redirect('/thankyou');
        });
    });
};

exports.checkoutCOD_get = function(req,res,){
    const manufacturer = productDao.get_Manufacturer();
    const category = productDao.get_Category();
    res.render('customer/checkoutCOD',{
        pageTitle: 'Thanh toán COD',
        manufacturerList: manufacturer,
        categoryList: category,
        curCustomer: req.user
    })
};

exports.checkoutCOD_post = function(req,res,){
    if(!req.session.cart){
        res.redirect('/cart');
    }
    const cart = new Cart(req.session.cart);
    var order = new Order({
        _id: new mongoose.Types.ObjectId(),
        customer: req.user._id,
        cart: cart,
        payment:'Ship COD',
        created: Date.now(),
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        sdt: req.body.sdt,
        isDeleted: false,
        status: 'Chưa giao'
    });

    order.save(function(error){
        if(error) throw error;
        req.flash('success','Giao dịch thành công !! Cám ơn bạn :D!!');
        req.session.cart = null;
        res.redirect('/thankyou');
    });
};

exports.thank_you = function(req,res){
    var successMsg = req.flash('success')[0];
    res.render('customer/thankyou', {
        pageTitle: 'Cám ơn bạn',
        successMsg: successMsg
    })
};

exports.userInfoUpdate_index = function(req, res){
    res.render('customer/userInfoUpdate', { pageTitle: 'Cập nhật thông tin tài khoản' });
};

exports.customer_register_get =  function(req, res){
    res.render('customer/register', {
        pageTitle: 'Đăng ký'
    });
};

exports.customer_check_username = async (req,res)=>{
    let check = {isAvailable: false};
    const foundUsername = await Customer.findOne({username: req.body.username});

    if(foundUsername)
    {
        check.isAvailable = true;
    }
    res.json(check);
};

exports.customer_register_post = async function(req, res){
    await mongoose.connect(mongoDB, function (error) {
        if (error)
            throw error;
        let customer = new Customer({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email: req.body.email,
            info: {
                name: req.body.name,
                address: req.body.address,
                sdt: req.body.sdt
            }
        });
        customer.password = customer.generateHash(req.body.inputPassword);
        customer.save(function (error) {
            if (error) throw error;
            req.flash(
                'success_msg',
                'Bạn đã đăng ký thành công và có thể đăng nhập lúc này'
            );
            res.redirect('login');
        });
    });
};

exports.customer_updateProfile_get = function(req, res) {
    res.render('customer/updateProfile', { pageTitle: 'Chỉnh sửa thông tin'});
};

exports.customer_updateProfile_post = function(req, res) {
    var customer = new Customer({
        _id: req.session.passport.user,
        username: req.body.username,
        email: req.body.email,
        info: {
            name: req.body.name,
            address: req.body.address,
            sdt: req.body.sdt
        }
    });
    //customer.password=customer.generateHash(req.body.password);
    Customer.findByIdAndUpdate(req.session.passport.user,customer,{},function(err){
        if(err){return next(err);}
        res.redirect('/');
    })
};



exports.customer_resetPassword = function(req, res) {

};
