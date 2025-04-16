const Inventory = require('../models/inventoryModel');
const RabbitMQ = require('../config/rabbitmq');

class InventoryController {
  static async updateStock(req, res) {
    try {
      const { product_id, quantity } = req.body;
      const inventory = await Inventory.updateStock({ product_id, quantity });
      if (!inventory) {
        return res.status(404).json({ error: 'Product not found or insufficient stock' });
      }
      res.json(inventory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getStock(req, res) {
    try {
      const { product_id } = req.params;
      const inventory = await Inventory.getStock(product_id);
      if (!inventory) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(inventory);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static startConsumer() {
    RabbitMQ.consume('inventory_queue', async (msg) => {
      const { order_id, items } = JSON.parse(msg.content.toString());
      console.log(`Processing inventory for order ${order_id}`);
      try {
        for (const item of items) {
          const inventory = await Inventory.updateStock({
            product_id: item.product_id,
            quantity: item.quantity
          });
          if (!inventory) {
            console.error(`Failed to update stock for product ${item.product_id}`);
          }
        }
      } catch (err) {
        console.error(`Error processing inventory: ${err.message}`);
      }
    });
  }
}

module.exports = InventoryController;