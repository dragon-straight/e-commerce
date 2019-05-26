const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';

const Admin=require('../models/admin');

exports.admin_login_get= function(req,res)
{
    res.render('admin/login');
}

exports.admin_register_get= function(req,res)
{
    res.render('admin/register');
}

