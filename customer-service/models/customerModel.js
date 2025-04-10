const pool = require('../config/database');

class Customer {
  static async initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        address TEXT,
        contact VARCHAR(255)
      )
    `);
  }

  static async create({ name, address, contact }) {
    const result = await pool.query(
      'INSERT INTO customers (name, address, contact) VALUES ($1, $2, $3) RETURNING *',
      [name, address, contact]
    );
    return result.rows[0];
  }
}

module.exports = Customer;