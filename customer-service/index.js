require('dotenv').config();
const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
const Customer = require('./models/customerModel');

const app = express();
app.use(express.json());

Customer.initialize().catch(console.error);

app.use('/customers', customerRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Customer Service running on port ${PORT}`));