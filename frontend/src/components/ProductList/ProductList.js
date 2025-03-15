import React from 'react';
import { SectionList, View, Text } from 'react-native';
import ProductItem from '../ProductItem/ProductItem';
import { styles } from './styles';

const ProductList = ({ products, onToggle, onDelete }) => {
    const sections = [
        {
            title: 'Do kupienia',
            data: products.filter(p => !p.isBought),
        },
        {
            title: 'Kupione',
            data: products.filter(p => p.isBought),
        },
    ];

    return (
        <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <ProductItem 
                    product={item}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            )}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                </View>
            )}
        />
    );
};

export default ProductList;