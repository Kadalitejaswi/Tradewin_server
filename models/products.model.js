const mongoose = require('mongoose');

var subSchema = mongoose.Schema({
    name:String,
    price:String,
    details:String,
    model:String,
    image:String,
    date:String,
    location:String
})

var subCategorySchema = mongoose.Schema({
    _id:String,
    name:String,
    image:String,
    sub:[subSchema]
})

var productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:String,
    subCategory:[subCategorySchema]
})

mongoose.model('Product',productSchema,'productdetails')