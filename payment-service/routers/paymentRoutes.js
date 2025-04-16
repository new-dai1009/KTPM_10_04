const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');

router.post('/', PaymentController.createPayment);
router.put('/:id/confirm', PaymentController.confirmPayment);

module.exports = router;