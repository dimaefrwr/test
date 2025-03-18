const validateProduct = (req, res, next) => {
    const { name, quantity } = req.body;
    
    if (!name || !quantity) {
        return res.status(400).json({ message: 'Name and quantity are required' });
    }
    
    if (typeof quantity !== 'number') {
        return res.status(400).json({ message: 'Quantity must be a number' });
    }
    
    next();
};

module.exports = { validateProduct };