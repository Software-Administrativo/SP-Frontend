import { sugarAxios } from "../../global";

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

const postTypePays = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/pays/register`, {
      "name": type.name,
      "description": type.description
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getTypePays, postTypePays };