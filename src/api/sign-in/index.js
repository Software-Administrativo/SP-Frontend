// Importamos la instancia de axios
import { sugarAxios } from "../global";
import { RESPONSES } from "@/helpers";

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
  } catch {
    return RESPONSES.WRONG;
  }
};

export { validateUser };
