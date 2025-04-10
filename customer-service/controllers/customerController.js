const Customer = require('../models/customerModel');

class CustomerController {
  static async createCustomer(req, res) {
    try {
      const { name, address, contact } = req.body;
      const customer = await Customer.create({ name, address, contact });
      res.status(201).json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CustomerController;