const amqp = require('amqplib');

class RabbitMQ {
  static async getChannel() {
    if (!this.channel) {
      const conn = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
      this.channel = await conn.createChannel();
      await this.channel.assertQueue('inventory_queue', { durable: true });
    }
    return this.channel;
  }

  static async consume(queue, callback) {
    const channel = await this.getChannel();
    channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg);
        channel.ack(msg);
      }
    });
  }
}

module.exports = RabbitMQ;