const pool = require('../config/database');

class Order {
  static async initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        customer_id INT,
        product_id INT,
        quantity INT
      )
    `);
  }

  static async create({ customer_id, product_id, quantity }) {
    const result = await pool.query(
      'INSERT INTO orders (customer_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [customer_id, product_id, quantity]
    );
    return result.rows[0];
  }
}

module.exports = Order;