const Schema = require('mongoose').Schema;

var usersSchema = new Schema({
    name:String,
    type:String,
    email:String,
    password:String,
    address:[String],
    phoneNumber:String,
    activeStatus:Boolean,
    gender:String
})

