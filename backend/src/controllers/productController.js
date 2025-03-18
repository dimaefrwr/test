const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addProduct = async (req, res) => {
    console.log('Otrzymane dane:', req.body);
    
    const product = new Product({
        name: req.body.name,
        quantity: req.body.quantity
    });

    try {
        const newProduct = await product.save();
        console.log('Zapisany produkt:', newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        console.log('Błąd zapisywania:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Nie znaleziono produktu' });
        }
        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Nie znaleziono produktu' });
        }
        await product.deleteOne();
        res.json({ message: 'Produkt usunięty' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};