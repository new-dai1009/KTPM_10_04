require('dotenv').config();
const express = require('express');
const shippingRoutes = require('./routes/shippingRoutes');
const Shipping = require('./models/shippingModel');
const ShippingController = require('./controllers/shippingController');

const app = express();
app.use(express.json());

Shipping.initialize().catch(console.error);
ShippingController.startConsumer(); // Khởi động consumer

app.use('/shipping', shippingRoutes);

const PORT = process.env.PORT || 8006;
app.listen(PORT, () => console.log(`Shipping Service running on port ${PORT}`));