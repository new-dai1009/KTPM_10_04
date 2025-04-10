require('dotenv').config();
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/productModel');

const app = express();
app.use(express.json());

// Khởi tạo bảng
Product.initialize().catch(console.error);

// Định tuyến
app.use('/products', productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));