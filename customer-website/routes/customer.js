const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
//Require controller modules
const customer_Controller = require('../controllers/customerController');

//GET register
router.get('/register',customer_Controller.customer_register_get);

//POST register
router.post('/register',customer_Controller.customer_register_post);

//GET login page
//router.get('/login',customer_Controller.customer_login_get);
router.get('/login',function(req,res,next){
    var messages = req.flash('error');
    res.render('customer/login',{messages: messages, hasErrors: messages.length > 0});
});

//POST login
//router.post('/login', customer_Controller.customer_login_post);
router.post('/login', passport.authenticate('local.signin',{
    successRedirect: '/',
    failureRedirect: '../login',
    failureFlash:true
}));
//logout
router.get('/logout',function(req,res,next){
   req.logout();
   res.redirect('/');
});

//GET forgot password page
router.get('/forgotPassword', customer_Controller.forgotPassword_index);

//GET order page
router.get('/orders',isLoggedIn, customer_Controller.customer_viewOrders);

//GET checkout page
router.get('/checkout', customer_Controller.checkout_index);

//GET update user info page
router.get('/userInfoUpdate',isLoggedIn, customer_Controller.userInfoUpdate_index);

//POST update info
router.post('/userInfoUpdate/updateInfo', customer_Controller.customer_updateInfo);

//POST reset password
router.post('/forgotPassword/reset', customer_Controller.customer_resetPassword);

//POST checkout
router.post('/checkout/process', customer_Controller.customer_checkout);

module.exports = router;

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}
