import axios from 'axios';
import { API_URL, ENDPOINTS } from '../constants/endpoints';

const api = axios.create({
    baseURL: API_URL
});

export const getProducts = () => api.get(ENDPOINTS.products);
export const addProduct = (product) => api.post(ENDPOINTS.products, product);
export const updateProduct = (id, product) => api.put(`${ENDPOINTS.products}/${id}`, product);
export const deleteProduct = (id) => api.delete(`${ENDPOINTS.products}/${id}`);