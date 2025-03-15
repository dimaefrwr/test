import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

const FilterBar = ({ onFilterChange }) => {
    const [priceFilter, setPriceFilter] = useState('');
    const [storeFilter, setStoreFilter] = useState('');

    const handleFilter = () => {
        onFilterChange({
            price: priceFilter ? parseFloat(priceFilter) : null,
            store: storeFilter
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Filtruj po cenie"
                value={priceFilter}
                onChangeText={setPriceFilter}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Filtruj po sklepie"
                value={storeFilter}
                onChangeText={setStoreFilter}
            />
            <TouchableOpacity style={styles.button} onPress={handleFilter}>
                <Text style={styles.buttonText}>Filtruj</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FilterBar;