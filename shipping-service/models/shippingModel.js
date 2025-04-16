const pool = require('../config/database');

class Shipping {
  static async initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shipping (
        id SERIAL PRIMARY KEY,
        order_id INT,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  static async create({ order_id }) {
    const result = await pool.query(
      'INSERT INTO shipping (order_id, status) VALUES ($1, $2) RETURNING *',
      [order_id, 'pending']
    );
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      'UPDATE shipping SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = Shipping;