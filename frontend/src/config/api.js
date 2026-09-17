const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = {
  baseURL: API_BASE_URL,

  employees: {
    list: () => `${API_BASE_URL}/employees/`,
    detail: (id) => `${API_BASE_URL}/employees/${id}/`,
    departments: () => `${API_BASE_URL}/employees/departments/`,
    stats: () => `${API_BASE_URL}/employees/stats/`,
  },
};

export default api;
