var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users.controller')

router.route('/user').get(userCtrl.getUsers).post(userCtrl.addUser);

router.route('/data').get(userCtrl.showData)

module.exports = router;