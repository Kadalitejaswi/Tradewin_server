const mongoose = require('mongoose')

var addressSchema = mongoose.Schema({
    type:String,
    flatNo:Number,
    street:String,
    landMark:String,
    district:String,
    state:String,
    pincode:Number
})

var usersSchema = mongoose.Schema({
    name:String,
    type:String,
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    address:[addressSchema],
    phoneNumber:String,
    activeStatus:Boolean,
    gender:String,
    role:String
})

mongoose.model('User',usersSchema,'user');