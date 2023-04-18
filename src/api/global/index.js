// Importaciones de axios
import axios from "axios";

// Instancia de axios con la URL de la API
const sugarAxios = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Instancia de axios con la URL de la API local
// const sugarAxios = axios.create({
//   baseURL: "http://localhost:3000/api/v1",
// });

export { sugarAxios }