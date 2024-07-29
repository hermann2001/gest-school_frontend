// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

export const fetchData = () => {
    return api.get('/schools');
};


export const montant_du = (matricule) => {
    return api.get(`/montant_du/${matricule}`);
};

export const montant_annexe_du = (matricule) => {
    return api.get(`/montant_annexe_du/${matricule}`);
};

export const payer = (paymentData) => {
    return api.post('/payer', paymentData);
};

export const payer_annexe = (paymentData) => {
    return api.post('/payer_annexe', paymentData);
};

export const historique = (matricule) => {
    return api.post('/historique', matricule);
};

export default api;
