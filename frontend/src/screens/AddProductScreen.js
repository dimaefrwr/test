import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, Button } from 'react-native';
import AddProductForm from '../components/AddProductForm/AddProductForm';
import { getProducts, deleteProduct, updateProduct } from '../api/api';

const ShoppingListScreen = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas pobierania produktów.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = (newProduct) => {
    fetchProducts();
  };

  const handleProductDeleted = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas usuwania produktu.');
    }
  };

  const handleProductUpdated = async (product) => {
    try {
      await updateProduct(product);
      fetchProducts();
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas aktualizacji produktu.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <Text>Ilość: {item.quantity}</Text>
      <Text>Cena: {item.price}</Text>
      <Text>Sklep: {item.shop}</Text>
      <Button title="Usuń" onPress={() => handleProductDeleted(item.id)} />
    </View>
  );

  const sections = [
    { title: 'Produkty', data: products },
  ];

  return (
    <View style={styles.container}>
      <Button title="Dodaj produkt" onPress={() => setModalVisible(true)} />
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <Text>Ładowanie...</Text>
      ) : (
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <AddProductForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onProductAdded={handleProductAdded}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ShoppingListScreen;