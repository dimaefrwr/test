import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import { addProduct } from '../../api/api';

const AddProductForm = ({ visible, onClose, onProductAdded }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [shop, setShop] = useState('');
  const [error, setError] = useState(null);

  const handleAddProduct = async () => {
    try {
      // Walidacja danych
      if (!name || !quantity || !price || !shop) {
        setError('Wszystkie pola są wymagane');
        return;
      }

      const newProduct = {
        name,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        shop
      };

      // Wywołanie funkcji dodawania produktu
      const addedProduct = await addProduct(newProduct);
      
      // Resetowanie formularza
      setName('');
      setQuantity('');
      setPrice('');
      setShop('');
      setError(null);

      // Wywołanie funkcji zwrotnej
      onProductAdded(addedProduct);
      onClose();
    } catch (err) {
      setError(err.message || 'Błąd podczas dodawania produktu');
      console.error('Błąd dodawania produktu:', err);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Dodaj produkt</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nazwa produktu"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Ilość"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
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
            value={shop}
            onChangeText={setShop}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.buttonContainer}>
            <Button title="Dodaj" onPress={handleAddProduct} />
            <Button title="Anuluj" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center'
  }
});

export default AddProductForm;