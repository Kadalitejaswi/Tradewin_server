var express = require('express');
var path = require('path');
var router = express.Router();
var homectrl = require('../controllers/home.controller');

router.route('/').get(homectrl.rootRequest)

router.route('/home').get(homectrl.homeRequest)

module.exports = router;