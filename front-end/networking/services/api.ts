import axios from "axios";

const api = axios.create({
  baseURL: "https://projeto-networking.onrender.com/api", // URL do backend
});

export default api;
