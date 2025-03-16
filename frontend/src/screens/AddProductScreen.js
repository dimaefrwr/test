import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { API_URL } from '../constants/endpoints';

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = async () => {
    console.log('API_URL:', API_URL);
    console.log('Wysyłam produkt:', { name, quantity });
    try {
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          quantity: parseInt(quantity),
        }),
      });
      const data = await response.json();
      console.log('Odpowiedź serwera:', data);
      if (response.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Błąd:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nazwa produktu"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Ilość"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddProduct}
        style={styles.button}
      >
        Dodaj
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});