import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const ProductItem = ({ product, onToggle, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.item, product.isBought && styles.bought]}
                onPress={() => onToggle(product.id)}
            >
                <View style={styles.details}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.store}>{product.store}</Text>
                    <Text style={styles.price}>${product.price}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => onDelete(product.id)}
                >
                    <Text style={styles.deleteText}>Usuń</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );
};

export default ProductItem;