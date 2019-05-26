const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const passport = require('passport');

passport.serializeUser(function(customer, done){
    done(null, customer.id);
});

passport.deserializeUser(function(id, done){
    Customer.findById(id, function(err, customer) {
        done(err, customer);
    });
});

/*passport.use('local-signup',new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallBack: true
},function (req,username,password,done) {
    Customer.findOne({'username':username},function(err,customer){
        if(err) {return done(err);}
        if(user){return done(null,false,{message:'Tên tài khoản đã được đăng ký.'});}
        var newCus = new Customer();


    })
}));*/

passport.use('local.signin',new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true
},function (req,username,password,done) {
    Customer.findOne({username:username},function(err,customer){
        if(err) {return done(err);}
        if(!customer){
            var message='Tên tài khoản chưa được đăng ký.';
            req.flash('error',message);
            return done(null,false);
        }
        if(!customer.validPassword(password)){
            var message='Mật khẩu không đúng.';
            req.flash('error',message);
            return done(null,false);
        }
        return done(null,customer);
    })
}));