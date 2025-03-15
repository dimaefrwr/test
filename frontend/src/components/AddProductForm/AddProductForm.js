import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

const AddProductForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [store, setStore] = useState('');

    const handleSubmit = () => {
        if (name && price && store) {
            onSubmit({
                name,
                price: parseFloat(price),
                store,
            });
            setName('');
            setPrice('');
            setStore('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nazwa produktu"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Cena"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Sklep"
                value={store}
                onChangeText={setStore}
            />
            <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Dodaj produkt</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddProductForm;