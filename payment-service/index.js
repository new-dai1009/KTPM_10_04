require('dotenv').config();
const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');
const Payment = require('./models/paymentModel');

const app = express();
app.use(express.json());

Payment.initialize().catch(console.error);

app.use('/payments', paymentRoutes);

const PORT = process.env.PORT || 8004;
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));