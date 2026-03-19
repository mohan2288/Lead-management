import axios from "axios";


const api = axios.create({
  baseURL: window.CONFIG.API_URL,
 // withCredentials: true,//
});

export default api;