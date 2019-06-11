const Customer = require('../models/customer');
const customerDao = require('../models/dao/customerDao');
const productDao = require('../models/dao/productDao');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var mongoose = require('mongoose');
var async = require('async');
const passport = require('passport');

exports.forgotPassword_index = function(req, res){
    res.render('customer/forgotPassword', { pageTitle: 'Phục hồi mật khẩu' });
};

exports.customer_orders = async function(req, res) {
    res.render('customer/orders', {
        pageTitle: 'Các đơn hàng'
    });
};

exports.checkout_index = function(req, res){
    if(!req.session.cart){
        res.redirect('/cart');
    }
    else{
        const manufacturer = productDao.get_Manufacturer();
        const category = productDao.get_Category();
        res.render('customer/checkout', {
            pageTitle: 'Thanh toán',
            manufacturerList: manufacturer,
            categoryList: category,
            curCustomer: req.user
        });
    }
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

/*exports.customer_login_get = function(req, res) {
    res.render('customer/login', { pageTitle: 'Đăng nhập'});
};

exports.customer_login_post = function(req, res,next){
    passport.authenticate('local.signin',{
        successRedirect: '/home/homepage',
        failureRedirect: '/customer/login',
        failureFlash:true
    })
};*/

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


exports.customer_checkout = function(req, res) {

};