const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://dragon-straight:8910JQKA@cluster0-dqpzz.mongodb.net/e-commerce';

const Manufacturer = require('../models/manufacturer');
const productDao = require('../models/dao/productDao');

exports.manufacturer_list=async function(req,res)
{
    const manufacturer = productDao.get_Manufacturer();
    res.render('manufacturer/list', { pageTitle: 'Danh sách nhà sản xuất',manufacturerList: await manufacturer,
});
}

exports.manufacturer_add_get=  function(req,res)
{ 
    res.render('manufacturer/add_edit', { pageTitle: 'Thêm nhà sản xuất' });
}

exports.manufacturer_add_post=  function(req,res)
{
   add(req,res);
   //console.log(req.body);
}

function add(req,res){
    mongoose.connect(mongoDB, function(error){
        if(error)
            throw error;
    
        console.log('Successfully connected');
    let mvcManufacturer = new Manufacturer({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        isDeleted: 0,
        img: '/img/'+req.body.img
    });

    mvcManufacturer.save(function(error){
        if(error) throw error;
        res.redirect('list');
    });  
})}

exports.manufacturer_edit= function(req,res)
{
    Manufacturer.findById(req.params.id,(err,doc)=> {
        if (!err)
        {
            res.render('manufacturer/add_edit',{
                pageTitle:"Chỉnh sửa thông tin",
                manufacturer:  doc
            });
        }
    });
};