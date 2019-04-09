const express = require('express');
const product = express.Router();
const checkAuth = require('../check_auth/middleware');
const products_controller = require('../Controllers/products_controller'); 
const utility = require('../Utils/utils');

//Route Handlers
product.get('/', checkAuth, products_controller.get_all_products);

product.post('/', checkAuth, utility.upload.single('Image'), products_controller.post_product);

product.get('/:product_id', checkAuth, products_controller.get_product_by_Id);

module.exports=product;

