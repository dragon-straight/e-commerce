const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: String
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;