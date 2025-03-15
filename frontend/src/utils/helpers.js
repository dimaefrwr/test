export const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
};

export const sortProducts = (products, sortBy = 'name') => {
    return [...products].sort((a, b) => {
        if (sortBy === 'price') {
            return a.price - b.price;
        }
        if (sortBy === 'store') {
            return a.store.localeCompare(b.store);
        }
        return a.name.localeCompare(b.name);
    });
};

export const filterProducts = (products, filters) => {
    return products.filter(product => {
        if (filters.price && product.price > filters.price) {
            return false;
        }
        if (filters.store && !product.store.toLowerCase().includes(filters.store.toLowerCase())) {
            return false;
        }
        return true;
    });
};