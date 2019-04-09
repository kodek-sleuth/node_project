const mongoose = require('mongoose');

//Creating Product Schema
const products = mongoose.Schema({
    Name: String,
    Price: String,
    Image: {type: String, required: true}
}, {collection: 'products'});

//Exporting it as Model
module.exports=mongoose.model('products', products)