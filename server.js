// require('./models/db.connection').open();
require('./models/db.connect');

var express = require('express');
var bodyparser = require('body-parser');

var app = express();
var router = require('./routes/index')
var userRoutes = require('./routes/users.routes');
var productRoutes = require('./routes/products.routes');
const CONFIG = require('./config/index')

app.use(bodyparser.urlencoded({extended:false})); // urlencoded data for parsing

app.use(bodyparser.json());

app.use('/',router);
app.use('/',userRoutes);
app.use('/api',productRoutes);

app.listen(CONFIG.PORT,CONFIG.HOST,()=>{
    console.log(`Server is Running at http://${CONFIG.HOST}:${CONFIG.PORT}`);
    
})