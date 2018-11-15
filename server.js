// require('./models/db.connection').open();
require('./app/models/db.connect');

var express = require('express');
var bodyparser = require('body-parser');
var fs=require('fs')
var app = express();
var router = require('./app/routes/index')
var userRoutes = require('./app/routes/users.routes');
var productRoutes = require('./app/routes/products.routes');
const CONFIG = require('./app/config/index')
//integrating log4js
const log4js = require ('log4js')
var log4jsConf = require('./app/config/log4js.json');
log4js.configure(log4jsConf);
var startuplogger = log4js.getLogger("startup")
var accesslogger = log4js.getLogger("access")



app.use(bodyparser.urlencoded({extended:false})); // urlencoded data for parsing

app.use(bodyparser.json());

try{
    fs.mkdirSync('./logs')
}catch(err){
  if(err.code!= "EEXIST"){
      console.log("Could not set up log directory",err);
      process.exit(1)
      
  }
}


app.use(function(req,res,next){
    console.log(req.method +"==" + req.url);

    accesslogger.info(req.method +"==" + req.url)
    next();
    
})

app.use('/',router);
app.use('/api',userRoutes);
app.use('/api',productRoutes);

app.listen(CONFIG.PORT,CONFIG.HOST,()=>{
    startuplogger.info(`Server is Running at http://${CONFIG.HOST}:${CONFIG.PORT}`)
    startuplogger.info(`Magic happened at port ${CONFIG.PORT}`)

    // console.log(`Server is Running at http://${CONFIG.HOST}:${CONFIG.PORT}`);
    
})