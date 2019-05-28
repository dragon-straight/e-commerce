const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';
var async = require('async');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const Admin = require('../models/admin');
const adminDao = require('../models/dao/adminDao');

exports.admin_login_get= function(req,res)
{
    res.render('admin/login');
};

exports.admin_register_get= function(req,res)
{
    res.render('admin/register');
};

exports.admin_register_post= function(req,res)
{
    const { name, email, password, password2, phone, address, position } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2 || !phone || !address || !position) {
      errors.push({ msg: 'Xin hãy điền hết thông tin' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Mật khẩu không khớp' });
    }
  
    if (password.length > 6) {
      errors.push({ msg: 'Mật khẩu phải ít hơn 6 kí tự' });
    }
  
    if (errors.length > 0) {
      res.render('admin/register', {
        errors,
        name,
        email,
        password,
        password2,
          phone,
          address,
          position
      });
    } else {
      Admin.findOne({ email: email }).then(admin => {
        if (admin) {
          errors.push({ msg: 'Email này đã tồn tại' });
          res.render('admin/register', {
            errors,
            name,
            email,
            password,
            password2,
              phone,
              address,
              position
          });
        } else {
          const newAdmin = new Admin({
              email: email,
              password,
              info:{
                  name: name,
                  address: address,
                  sdt: phone,
                  position: position
              }
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
                    'Bạn đã đăng ký thành công và có thể đăng nhập lúc này'
                  );
                  res.redirect('/admin/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
};

exports.admin_login_post=function(req,res,next)
{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
      })(req, res, next);
};

exports.admin_logout=function(req,res,next)
{
    req.logout();
    req.flash('success_msg', 'Bạn đã đăng xuất thành công');
    res.redirect('/admin/login');
};

exports.admin_list = async (req,res) =>
{
    const admins = await adminDao.get_Admin_List();
    res.render('admin/list', {
        pageTitle: 'Danh sách admin',
        adminList: admins
    });
};

exports.admin_info = async (req, res) => {
    passport.serializeUser()
};