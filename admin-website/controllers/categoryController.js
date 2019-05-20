const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';

const Category = require('../models/category');
const productDao = require('../models/dao/productDao');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
exports.category_stall=function(req,res)
{
    res.render('category/stall', { pageTitle: 'Quản lý gian hàng' });
}

exports.category_list= async function(req,res)
{
    const category = Category.find();
    res.render('category/list', { pageTitle: 'Danh sách loại giày',categoryList: await category,
});
}

exports.category_add_get=  function(req,res)
{ 
    res.render('category/add_edit', { pageTitle: 'Thêm loại giày' });
}

exports.category_add_post=  function(req,res)
{
    if (req.body._id=='')
        add(req,res);
    else
        console.log('update');
        //update(req,res);
}

function add(req,res){
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
    
        console.log('Successfully connected');
    let mvcCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        isDeleted: 0,
    });

    mvcCategory.save(function(error){
        if(error) throw error;
        res.redirect('list');
    });  
})}

exports.category_edit= function(req,res)
{
     Category.findById(req.params.id,(err,doc)=> {
        if (!err)
        {
            res.render('category/add_edit',{
                pageTitle:"Chỉnh sửa thông tin",
                category:  doc
            });
        }
    });
};

exports.category_delete=function(req,res)
{
    Category.findByIdAndRemove(req.params.id, function (err){
        if (!err)
        res.redirect('list');
    })

}