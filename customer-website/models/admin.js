const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let adminSchema = new Schema({
    username: String,
    password: String,
});

//hash the password
adminSchema.method.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
adminSchema.method.validPassword = function (password){
    return bcrypt.compareSync(password,this.password);
};

let Admin =  mongoose.model('Admin', adminSchema);

module.exports = Admin;

