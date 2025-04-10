const pool = require('../config/database');

class Product {
  static async initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        price FLOAT,
        description TEXT,
        stock INT
      )
    `);
  }

  static async create({ name, price, description, stock }) {
    const result = await pool.query(
      'INSERT INTO products (name, price, description, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, description, stock]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Product;