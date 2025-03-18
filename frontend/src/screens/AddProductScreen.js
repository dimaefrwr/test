import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { API_URL } from '../constants/endpoints';

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddProduct = async () => {
    try {
      const requestBody = {
        name,
        quantity: parseInt(quantity),
      };
      
      console.log('Rozpoczynam wysyłanie danych');
      console.log('URL:', API_URL);
      console.log('Dane do wysłania:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Status odpowiedzi:', response.status);
      const responseText = await response.text();
      console.log('Surowa odpowiedź:', responseText);
      
      if (responseText) {
        const data = JSON.parse(responseText);
        console.log('Przetworzona odpowiedź:', data);

        if (response.ok) {
          Alert.alert('Sukces', 'Produkt został dodany!');
          setName('');
          setQuantity('');
          navigation.goBack();
        } else {
          Alert.alert('Błąd', data.message || 'Nie udało się dodać produktu');
        }
      }
    } catch (error) {
      console.log('Złapany błąd:', error);
      Alert.alert('Błąd', 'Wystąpił problem podczas dodawania produktu');
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
        disabled={!name || !quantity}
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
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
});