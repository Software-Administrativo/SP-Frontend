import { sugarAxios } from "../global";

/**
 * data: data type pays
 * @returns API Response, with the data of the type pays
 */
const getTypePays = async () => {  
  try {
    const { data } = await sugarAxios.get(`/maintenance/pays`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getTypePays };