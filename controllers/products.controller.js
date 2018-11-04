var productData = require('../models/data/productdetails.json');
var fs = require('fs');
var con = require('../models/db.connection');
var objectId = require('mongodb').ObjectId;

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

    // var products = productData.slice(offset,count);
    // console.log(products.length);
    
    var db = con.get().db('tradewin');
    var collection = db.collection('productdetails');
    collection.find({}).skip(offset).limit(count)
    .toArray((err,products)=>{
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
    var collection = con.get().db('tradewin').collection('productdetails');

    if(req.params.productId){
        collection.findOne({_id:objectId(productId)},function(error,product){
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
    var collection = con.get().db('tradewin').collection('productdetails');
    if(req.body){
        collection.insertOne(req.body,(error,response)=>{
            if(error) {
                res.status(500).set('application/json')
                .json({
                    error:"Internal server",
                    msg:"Product not inserted"
                })
            }
            else {
                res.status(200).set('application/json')
                .json(req.body)
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
    var collection = con.get().db('tradewin').collection('productdetails');
    if(req.body){
        var filterQuery = {_id:objectId(productId)};
        var updateQuery = {
            $set:{
                name:req.body.name,
                details:req.body.details,
                type:req.body.type
            }
        }

        collection.updateOne(filterQuery,updateQuery,(error,response)=>{
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