const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);

mongoose.connect('mongodb://localhost:27017/shopping-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;