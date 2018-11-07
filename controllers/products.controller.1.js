const mongoose = require('mongoose');

var Product = mongoose.model('Product')

module.exports.getAllProducts = (req,res,next)=>{
    console.log(req.url);
    console.log(req.query);
    var offset = 0;
    var count = 5;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    }

    
    Product.find({}).skip(offset).limit(count)
    .exec((err,products)=>{
        if(err) {
            console.log(err);
            res.status(404).set('application/json')
            .json({
                message:"Products data not found",
                error:err
            });
        }
        else {
            console.log(products.length);
            
            res.status(200).set('application/json')
            .json(products);
        }        
    });
    
}

module.exports.getOneProduct = (req,res,next)=>{
    console.log(req.params);
    
    var productId = req.params.productId;

    if(req.params.productId){
        Product.findById(productId)
        .exec(function(error,product){
            if(error) {
                res.status(404).set('application/json')
                .json({
                    error:"NOT FOUND",
                    msg:"ProductID not found"
                })
            }
            else {
                res.status(200).set('application/json')
                .json(product)
            }
        })
    }
    else {
        res.status(404).set('application/json')
        .json({
            error:"NOT FOUND",
            msg:"ProductID not found"
        })
    }
}

module.exports.addOneProduct = (req,res,next)=>{
    console.log("Add one product");

    if(req.body){
        // var product = new Product(req.body)
        Product
        .create(req.body,(error,response)=>{
            if(error) {
                res.status(500).set('application/json')
                .json({
                    error:"Internal server",
                    msg:"Product not inserted"
                })
            }
            else {
                res.status(200).set('application/json')
                .json(response)
            }
        })
    }
    else {
        res.status(404).set('application/json')
        .json({
            error:"Not found",
             msg:"Product not found"
        })
    }
    
    
}

module.exports.updateOneProduct = (req,res,next)=>{
    var productId = req.params.productId;
    if(req.body){

        Product.findByIdAndUpdate(productId,req.body,{new:true},(error,response)=>{
            if(error) {
                res.status(500).set('application/json')
                .json({
                    error:"Internal server",
                    msg:"Product not updated"
                })
            }
            else {
                res.status(200).set('application/json')
                .json(response)
            }
        })
    }
    else {
        res.status(404).set('application/json')
        .json({
            error:"Not found",
             msg:"Product not found"
        })
    }
}