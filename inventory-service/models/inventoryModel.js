const pool = require('../config/database');

class Inventory {
  static async initialize() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        product_id INT PRIMARY KEY,
        stock INT
      )
    `);
  }

  static async updateStock({ product_id, quantity }) {
    const result = await pool.query(
      'UPDATE inventory SET stock = stock - $1 WHERE product_id = $2 AND stock >= $1 RETURNING *',
      [quantity, product_id]
    );
    return result.rows[0];
  }

  static async getStock(product_id) {
    const result = await pool.query('SELECT * FROM inventory WHERE product_id = $1', [product_id]);
    return result.rows[0];
  }
}

module.exports = Inventory;