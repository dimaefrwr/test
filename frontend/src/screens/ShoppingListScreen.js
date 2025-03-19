import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Modal, StyleSheet } from 'react-native';
import api from '../api/api';
import AddProductForm from '../components/AddProductForm/AddProductForm';

const ShoppingListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.getProducts();
      console.log('Dane z backendu:', response);
      setProducts(response);
      console.log('Aktualny stan products:', products); // Dodany log
      setLoading(false);
    } catch (error) {
      console.error('Błąd pobierania produktów:', error);
      setLoading(false);
    }
  }

  const handleDeleteProduct = async (id) => {
    await api.deleteProduct(id);
    fetchProducts();
  };

  const handleUpdateProduct = async (id, product) => {
    await api.updateProduct(id, product);
    fetchProducts();
  };

  const handleAddProduct = async (product) => {
    console.log('Otrzymane dane:', product);
    await api.addProduct(product);
    fetchProducts();
  };

  const renderItem = ({ item }) => {
    console.log('Renderowany item:', item);
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
        <Text>Ilość: {item.quantity}</Text>
        <Text>Cena: {item.price}</Text>
        <Text>Sklep: {item.shop}</Text>
        <Button title="Usuń" onPress={() => handleDeleteProduct(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista Zakupów</Text>
      <Button title="Dodaj produkt" onPress={() => setModalVisible(true)} />
      {loading ? (
        <Text>Ładowanie...</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Modal visible={modalVisible} animationType="slide">
        <AddProductForm
          onClose={() => setModalVisible(false)}
          onAddProduct={handleAddProduct}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ShoppingListScreen;