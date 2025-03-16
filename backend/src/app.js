const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', productRoutes);

// MongoDB connection
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

// Server start
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;