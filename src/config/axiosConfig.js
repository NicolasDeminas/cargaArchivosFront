import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "http://localhost:8080",
  //baseURL: "https://cargararchivos.herokuapp.com/", 
});

export default clienteAxios;
