import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL}); 
API.interceptors.request.use(req => {
    if (localStorage.getItem('token')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    return req;
})

export const fetchItems = () => API.get(`/items`);
export const fetchItem = (id) => API.get(`/items/${id}`);
export const createItem = (newItem) => API.post('/items', newItem);
export const updateItem = (id, updatedItem) => API.patch(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export const signin = (formData) => API.post(`/user/signin`, formData);
export const signup = (formData) => API.post(`/user/signup`, formData);