const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/inventoryController');

router.put('/stock', InventoryController.updateStock);
router.get('/stock/:product_id', InventoryController.getStock);

module.exports = router;