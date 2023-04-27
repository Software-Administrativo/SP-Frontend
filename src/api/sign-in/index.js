// Importamos la instancia de axios
import { sugarAxios } from "../global";

/**
 * @param: typeDocument, documentUser, password
 * @returns token, msg
 */
const validateUser = async ({ typeDocument, documentUser, password }) => {
  try {
    const { data } = await sugarAxios.post(`users/login`, {
      tpdocument: typeDocument,
      numdocument: documentUser,
      password: password,
    });
    return data;
  } catch (error) {
    return data;
  }
};

export { validateUser };
