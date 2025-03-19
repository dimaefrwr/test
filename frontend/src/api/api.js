import axios from 'axios';

const API_URL = 'http://192.168.0.104:3000'; // Upewnij się, że adres IP jest poprawny

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const addProduct = async (product) => {
  const response = await api.post('/products', product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
};

export const updateProduct = async (id, product) => {
  await api.put(`/products/${id}`, product);
};

export default {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};