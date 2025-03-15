import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import { addProduct } from '../../api/api';

const AddProductScreen = ({ navigation }) => {
    const handleSubmit = async (productData) => {
        try {
            await addProduct(productData);
            navigation.goBack();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <View style={styles.container}>
            <AddProductForm onSubmit={handleSubmit} />
        </View>
    );
};

export default AddProductScreen;