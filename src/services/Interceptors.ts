import Cookies from "js-cookie";
import api from "./AxiosInstance";

api.interceptors.request.use(
  (config) => {

    const token = Cookies.get(window.CONFIG.TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      Cookies.remove(window.CONFIG.TOKEN_KEY);
      window.location.href = "/";
    }
    

    return Promise.reject(error);
  }
);

export default api;