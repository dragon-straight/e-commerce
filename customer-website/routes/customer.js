const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const customerDao = require('../models/dao/customerDao');
//Require controller modules
const customer_Controller = require('../controllers/customerController');

//GET register
router.get('/register',customer_Controller.customer_register_get);

//POST register
router.post('/register',customer_Controller.customer_register_post);

//GET login page
//router.get('/login',customer_Controller.customer_login_get);
router.get('/login',function(req,res,next){
    console.log(req.flash('error'));
    const messages = req.flash('error');
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
router.get('/profile',isLoggedIn, customer_Controller.customer_profile);

//GET checkout page
router.get('/checkout', customer_Controller.checkout_index);

//GET update profile
router.get('/updateProfile',isLoggedIn, customer_Controller.customer_updateProfile_get);

//POST update profile
router.post('/updateProfile',isLoggedIn, customer_Controller.customer_updateProfile_post);

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
