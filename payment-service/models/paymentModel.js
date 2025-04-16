const pool = require('../config/database');

class Payment {
  static async initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INT,
        amount FLOAT,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  static async create({ order_id, amount }) {
    const result = await pool.query(
      'INSERT INTO payments (order_id, amount, status) VALUES ($1, $2, $3) RETURNING *',
      [order_id, amount, 'pending']
    );
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE payments SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = Payment;