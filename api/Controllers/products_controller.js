const products = require('../Models/product')

exports.get_all_products = (req, res, next)=>{
    products.find({}, {"Name":true, "Price":true, "Image": true, "_id":false})
    .exec()
    .then((response)=>{
        res.status(200).json({
            Count: response.length,
            Products: response
        })
    })
    .catch((error)=>{
        res.status(500).json({
            Error: error
        })
    });
}

exports.post_product = (req, res, next)=>{
    console.log(req.file);
    new_product = new products({
        Name: req.body.Name,
        Price: req.body.Price,
        Image: req.file.path
    });
    new_product.save()
    .then((response)=>console.log(response))
    .catch((error)=> console.log(error))
    res.status(201).json({
        Message: "Successfully Added Product"
    });
}

exports.get_product_by_Id = (req, res, next)=>{
    //Get The id from Params
    const product_id=req.params.product_id
}