const express = require('express');
const router = express.Router();
const GatewayController = require('../controllers/gatewayController');

router.post('/products', GatewayController.proxyToProduct);
router.post('/orders', GatewayController.proxyToOrder);
router.post('/customers', GatewayController.proxyToCustomer);

module.exports = router;