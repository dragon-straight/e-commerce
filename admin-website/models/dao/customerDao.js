const Customer = require('../customer');

exports.get_Customer_List = () => {
    return Customer.find({});
};

exports.get_Customer_By_Id = id => {
    return Customer.find({_id: id});
};