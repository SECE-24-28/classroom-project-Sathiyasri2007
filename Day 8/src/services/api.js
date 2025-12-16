import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData)
};

// Transaction API
export const transactionAPI = {
  addTransaction: (transactionData) => api.post('/transactions', transactionData),
  getTransactions: () => api.get('/transactions'),
  getTransactionById: (id) => api.get(`/transactions/${id}`)
};

// Plan API
export const planAPI = {
  getPlans: () => api.get('/plans'),
  addPlan: (planData) => api.post('/plans', planData),
  updatePlan: (id, planData) => api.put(`/plans/${id}`, planData),
  deletePlan: (id) => api.delete(`/plans/${id}`)
};

export default api;
