var path = require('path');

module.exports.getUsers = function(req,res){
    var user = {
        name:"JACK",
        age:29
    }
    console.log(req.url," ",req.method);
    res.status(200)
    .json(user)
};

module.exports.showData = function(req,res){
    console.log(req.url," ",req.method);
    res.status(200)
    .set("text/html")
    .sendFile(path.join(__dirname,'../views/index.html'))
};
module.exports.addUser = (req,res)=>{
    console.log(req.url," ",req.method);
    res.status(200)
    .set("text/html")
    .send('user is added')
}