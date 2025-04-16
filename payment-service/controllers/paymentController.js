const Payment = require('../models/paymentModel');

class PaymentController {
  static async createPayment(req, res) {
    try {
      const { order_id, amount } = req.body;
      const payment = await Payment.create({ order_id, amount });
      res.status(201).json(payment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async confirmPayment(req, res) {
    try {
      const { id } = req.params;
      const payment = await Payment.updateStatus(id, 'confirmed');
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.json(payment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PaymentController;