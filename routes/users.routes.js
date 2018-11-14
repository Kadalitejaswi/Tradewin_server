var express = require('express');
var router = express.Router();
// var userCtrl = require('../controllers/users.controller');
var authCtrl = require('../controllers/auth.controller');

router.route('/user/auth').get(authCtrl.tokenValidator);

router.route('/user/register').post(authCtrl.registration);
router.route('/user/login').post(authCtrl.login);


// router.route('/users/delete/:userId').delete(userCtrl.deleteOneUser);
// router.route('/users/:userId').get(userCtrl.getOneUser);

module.exports = router;