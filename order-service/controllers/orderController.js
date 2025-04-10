const Order = require('../models/orderModel');
const amqp = require('amqplib');

class OrderController {
  static async createOrder(req, res) {
    try {
      const { customer_id, product_id, quantity } = req.body;
      const order = await Order.create({ customer_id, product_id, quantity });

      // Kết nối RabbitMQ
      const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
      const channel = await connection.createChannel();
      await channel.assertQueue('order_queue');
      channel.sendToQueue('order_queue', Buffer.from(`Order ${order.id} created`));
      await channel.close();
      await connection.close();

      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = OrderController;