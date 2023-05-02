// Importamos la instancia de axios
import { sugarAxios } from "../global";

/**
 * name: pokemon name
 * @returns API Response, with the data of the pokemon
 */
const closeSesionUser = async () => {
  try {
    const { data } = await sugarAxios.post(`users/logout`);
    return data;
  } catch (error) {
    return data;
  }
};

export { closeSesionUser };
