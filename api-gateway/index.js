require('dotenv').config();
const express = require('express');
const gatewayRoutes = require('./routes/gatewayRoutes');

const app = express();
app.use(express.json());

app.use('/', gatewayRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));