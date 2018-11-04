var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/products.controller');

router.route('/products').get(productCtrl.getAllProducts);
router.route('/products/new').post(productCtrl.addOneProduct);
router.route('/products/update/:productId').put(productCtrl.updateOneProduct)
router.route('/products/:productId').get(productCtrl.getOneProduct);

module.exports = router;