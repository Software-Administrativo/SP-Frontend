// Importamos la instancia de axios
import { sugarAxios } from "../global";

/**
 * name: pokemon name
 * @returns API Response, with the data of the pokemon
 */
const getPokemon = async (name) => {
  try {
    const { data } = await sugarAxios.get(`/pokemon/${name}`);
    console.log(data.abilities);
    return data.abilities;
  } catch (error) {
    console.error(error);
  }
};

export { getPokemon };
