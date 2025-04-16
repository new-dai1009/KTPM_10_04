const Shipping = require('../models/shippingModel');
const RabbitMQ = require('../config/rabbitmq');

class ShippingController {
  static async createShipping(req, res) {
    try {
      const { order_id } = req.body;
      const shipping = await Shipping.create({ order_id });
      res.status(201).json(shipping);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const shipping = await Shipping.updateStatus(id, status);
      if (!shipping) {
        return res.status(404).json({ error: 'Shipping not found' });
      }
      res.json(shipping);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static startConsumer() {
    RabbitMQ.consume('shipping_queue', async (msg) => {
      const { order_id } = JSON.parse(msg.content.toString());
      console.log(`Processing shipping for order ${order_id}`);
      try {
        const shipping = await Shipping.create({ order_id });
        console.log(`Shipping created: ${shipping.id}`);
      } catch (err) {
        console.error(`Error processing shipping: ${err.message}`);
      }
    });
  }
}

module.exports = ShippingController;