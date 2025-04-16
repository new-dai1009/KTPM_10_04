require('dotenv').config();
const express = require('express');
const inventoryRoutes = require('./routes/inventoryRoutes');
const Inventory = require('./models/inventoryModel');
const InventoryController = require('./controllers/inventoryController');

const app = express();
app.use(express.json());

Inventory.initialize().catch(console.error);
InventoryController.startConsumer(); // Khởi động consumer

app.use('/inventory', inventoryRoutes);

const PORT = process.env.PORT || 8005;
app.listen(PORT, () => console.log(`Inventory Service running on port ${PORT}`));