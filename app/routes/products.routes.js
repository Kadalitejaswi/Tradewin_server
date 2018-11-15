var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/products.controller.1');
var authCtrl = require('../controllers/auth.controller');

router.route('/products').get(authCtrl.tokenValidator, productCtrl.getAllProducts);
router.route('/products/new').post(productCtrl.addOneProduct);
router.route('/products/update/:productId').put(productCtrl.updateOneProduct)
router.route('/products/:productId').get(productCtrl.getOneProduct);

module.exports = router;