// Importamos la instancia de axios
import { sugarAxios } from "../global";

/**
 * name: pokemon name
 * @returns API Response, with the data of the pokemon
 */
const validateUser = async ({typeDocument, documentUser, password}) => {
  try {
    const { data } = await sugarAxios.post(`users/login`, 
    {
      "tpdocument": typeDocument,
      "numdocument": documentUser,
      "password": password
    });
    console.log(data.message);
    // return data;
  } catch (error) {
    return data
  }
};

export { validateUser };
