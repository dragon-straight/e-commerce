const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    isDeleted: Boolean
});

const Manufacturer = mongoose.model('Manufacturer',manufacturerSchema);
module.exports = Manufacturer;

