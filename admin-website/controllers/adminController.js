const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var async = require('async');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Admin = require('../models/admin');
const { forwardAuthenticated } = require('../config/auth');

exports.admin_login_get= function(req,res)
{
    res.render('admin/login');
}

exports.admin_register_get= function(req,res)
{
    res.render('admin/register');
}

exports.admin_register_post= function(req,res)
{
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('admin/register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      Admin.findOne({ email: email }).then(admin => {
        if (admin) {
          errors.push({ msg: 'Email already exists' });
          res.render('admin/register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newAdmin = new Admin({
            username:req.body.email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newAdmin.password, salt, (err, hash) => {
              if (err) throw err;
              newAdmin.password = hash;
              newAdmin
                .save()
                .then(admin => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/catalog/admin/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
}

exports.admin_login_post=function(req,res,next)
{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/catalog/admin/login',
        failureFlash: true
      })(req, res, next);
}

exports.admin_logout=function(req,res,next)
{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/catalog/admin/login');
}