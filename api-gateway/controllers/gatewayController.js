const Proxy = require('../config/proxy');

class GatewayController {
  static async proxyToProduct(req, res) {
    try {
      const data = await Proxy.forwardRequest(process.env.PRODUCT_SERVICE_URL, 'post', '/products', req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async proxyToOrder(req, res) {
    try {
      const data = await Proxy.forwardRequest(process.env.ORDER_SERVICE_URL, 'post', '/orders', req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async proxyToCustomer(req, res) {
    try {
      const data = await Proxy.forwardRequest(process.env.CUSTOMER_SERVICE_URL, 'post', '/customers', req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async proxyToPayment(req, res) {
    try {
      const data = await Proxy.forwardRequest(process.env.PAYMENT_SERVICE_URL, 'post', '/payments', req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async proxyToInventory(req, res) {
    try {
      const data = await Proxy.forwardRequest(process.env.INVENTORY_SERVICE_URL, 'put', '/inventory/stock', req.body);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async proxyToShipping(req, res) {
    try {
      const data = await Proxy.forwardRequest(process.env.SHIPPING_SERVICE_URL, 'post', '/shipping', req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = GatewayController;