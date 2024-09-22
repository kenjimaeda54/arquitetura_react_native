import axios from "axios";
import { useLoginStore } from "../store/useLoginStore";

const api = axios.create({
  baseURL: "https://api.getfestivo.com",
});

api.interceptors.request.use(function (config) {
  config.params = {
    api_key: "tok_v3_vsJn3nwrOPWkAZoZj4v9aEmPuwZt6tsxpeFdmJg9Dcc44PvB",
    country: "BR",
    year: "2024"

  }
  return config;
}, function (error) {
  console.log(error);
  return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  //poderia comparar com o status code para redirecionar para a tela de login
  if (error.response?.status === 400) {
    useLoginStore.setState({ isLogged: false })
  }
  return Promise.reject(error);
});
export { api }
