const amqp = require('amqplib');

class RabbitMQ {
  static async getChannel() {
    if (!this.channel) {
      const conn = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
      this.channel = await conn.createChannel();
      await this.channel.assertQueue('inventory_queue', { durable: true });
      await this.channel.assertQueue('shipping_queue', { durable: true });
    }
    return this.channel;
  }

  static async publish(queue, message) {
    const channel = await this.getChannel();
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }
}

module.exports = RabbitMQ;