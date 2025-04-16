const express = require('express');
const router = express.Router();
const ShippingController = require('../controllers/shippingController');

router.post('/', ShippingController.createShipping);
router.put('/:id', ShippingController.updateStatus);

module.exports = router;