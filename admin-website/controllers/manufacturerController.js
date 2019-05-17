const Manufacturer = require('../models/manufacturer');
const productDao = require('../models/dao/productDao');

exports.manufacturer_list=async function(req,res)
{
    const manufacturer = productDao.get_Manufacturer();
    res.render('manufacturer/list', { pageTitle: 'Danh sách nhà sản xuất',manufacturerList: await manufacturer,
});
}

exports.manufacturer_add= async function(req,res)
{
    res.render('manufacturer/add', { pageTitle: 'Thêm nhà sản xuất' });
}