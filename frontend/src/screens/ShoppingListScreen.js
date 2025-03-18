import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { API_URL } from '../constants/endpoints';

export default function ShoppingListScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log('Pobrane produkty:', data);
      setProducts(data);
    } catch (error) {
      console.log('Błąd pobierania:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {products.map(item => (
          <View key={item._id} style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.quantity}>Ilość: {item.quantity}</Text>
          </View>
        ))}
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.addButton}
      >
        Dodaj produkt
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    margin: 16,
  },
});