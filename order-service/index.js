require('dotenv').config();
const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const Order = require('./models/orderModel');

const app = express();
app.use(express.json());

Order.initialize().catch(console.error);

app.use('/orders', orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));