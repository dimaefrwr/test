import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const addProduct = async (productData) => {
  try {
    console.log('Wysyłanie produktu:', productData);
    const response = await axios.post(`${API_URL}/products`, productData);
    console.log('Odpowiedź backendu:', response.data);
    return response.data;
  } catch (error) {
    console.error('Pełny błąd podczas dodawania produktu:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    console.log('Próba pobrania produktów');
    const response = await axios.get(`${API_URL}/products`);
    console.log('Pobrane produkty:', response.data);
    return response.data;
  } catch (error) {
    console.error('Szczegółowy błąd pobierania produktów:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_URL}/products/${productId}`);
  } catch (error) {
    console.error('Błąd podczas usuwania produktu:', error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await axios.put(`${API_URL}/products/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas aktualizacji produktu:', error);
    throw error;
  }
};