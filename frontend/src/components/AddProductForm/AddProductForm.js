import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddProductForm = ({ onClose, onAddProduct }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddProduct = async () => {
    console.log('Dane do wysłania:', { name, quantity, price, shop });
    setLoading(true);
    setError(null);
    try {
      const newProduct = { name, quantity, price, shop };
      console.log('Przekazywane dane:', newProduct);
      await onAddProduct(newProduct);
      onClose();
      setName('');
      setQuantity('');
      setPrice('');
      setShop('');
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas dodawania produktu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <Text>Nazwa produktu:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa produktu"
        value={name}
        onChangeText={setName}
      />
      <Text>Ilość:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ilość"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Text>Cena:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cena"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text>Sklep:</Text>
      <TextInput
        style={styles.input}
        placeholder="Sklep"
        value={shop}
        onChangeText={setShop}
      />
      <Button
        title={loading ? 'Dodawanie...' : 'Dodaj'}
        onPress={handleAddProduct}
        disabled={loading}
      />
      <Button title="Anuluj" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddProductForm;