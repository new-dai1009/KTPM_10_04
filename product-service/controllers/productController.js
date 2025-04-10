const Product = require('../models/productModel');

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, price, description, stock } = req.body;
      const product = await Product.create({ name, price, description, stock });
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ProductController;