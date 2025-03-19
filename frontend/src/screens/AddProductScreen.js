import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, Button, Alert } from 'react-native';
import AddProductForm from '../components/AddProductForm/AddProductForm';
import { getProducts, deleteProduct, updateProduct, addProduct } from '../api/api';

const ShoppingListScreen = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Komponenty zamontowane');
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Wywołanie fetchProducts');
      const data = await getProducts();
      console.log('Surowe dane produktów:', data);
      
      // Upewnij się, że dane mają odpowiednią strukturę
      const validProducts = Array.isArray(data) 
        ? data.filter(product => product && product.id) 
        : [];
      
      console.log('Przefiltrowane produkty:', validProducts);
      setProducts(validProducts);
    } catch (err) {
      console.error('Pełny błąd:', err);
      setError(err.message || 'Wystąpił błąd podczas pobierania produktów.');
      Alert.alert('Błąd', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductAdded = async (newProduct) => {
    try {
      console.log('Dodawanie nowego produktu:', newProduct);
      const addedProduct = await addProduct(newProduct);
      console.log('Produkt dodany:', addedProduct);
      
      setModalVisible(false);
      await fetchProducts();
      
      Alert.alert('Sukces', 'Produkt został dodany');
    } catch (err) {
      console.error('Błąd podczas dodawania produktu:', err);
      Alert.alert('Błąd', 'Nie udało się dodać produktu');
    }
  };

  const handleProductDeleted = async (productId) => {
    try {
      await deleteProduct(productId);
      fetchProducts();
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas usuwania produktu.');
      Alert.alert('Błąd', err.message);
    }
  };

  const handleProductUpdated = async (product) => {
    try {
      await updateProduct(product);
      fetchProducts();
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas aktualizacji produktu.');
      Alert.alert('Błąd', err.message);
    }
  };

  const renderItem = ({ item }) => {
    if (!item) return null;
    return (
      <View style={styles.item}>
        <Text>{item.name || 'Brak nazwy'}</Text>
        <Text>Ilość: {item.quantity || 0}</Text>
        <Text>Cena: {item.price || 0}</Text>
        <Text>Sklep: {item.shop || 'Nieznany'}</Text>
        <Button 
          title="Usuń" 
          onPress={() => handleProductDeleted(item.id)} 
        />
      </View>
    );
  };

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
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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