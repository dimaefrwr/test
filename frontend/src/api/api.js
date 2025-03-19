import axios from 'axios';

// Ustaw port na 3000
const API_URL = 'http://192.168.0.104:3000/api';

export const getProducts = async () => {
  try {
    console.log('Wysyłanie żądania do:', `${API_URL}/products`);
    const response = await axios.get(`${API_URL}/products`);
    console.log('Odpowiedź serwera:', response.data);
    return response.data;
  } catch (error) {
    console.error('Szczegółowy błąd pobierania produktów:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Błąd dodawania produktu:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Błąd usuwania produktu:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Błąd aktualizacji produktu:', error);
    throw error;
  }
};