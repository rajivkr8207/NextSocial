import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        type: "NETWORK_ERROR",
        message: "Network error. Please check your connection.",
      });
    }

    const { status, data } = error.response;

    return Promise.reject({
      type: "API_ERROR",
      status,
      message: data?.message || "Something went wrong",
    });
  }
);

export default api;