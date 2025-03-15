import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import ProductList from '../../components/ProductList/ProductList';
import FilterBar from '../../components/FilterBar/FilterBar';
import { getProducts, updateProduct, deleteProduct } from '../../api/api';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id) => {
        const product = products.find(p => p.id === id);
        try {
            await updateProduct(id, { ...product, isBought: !product.isBought });
            loadProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={styles.container}>
            <FilterBar />
            <ProductList 
                products={products}
                onToggle={handleToggle}
                onDelete={handleDelete}
            />
        </View>
    );
};

export default HomeScreen;