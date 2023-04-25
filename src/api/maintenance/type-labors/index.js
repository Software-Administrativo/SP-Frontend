import { sugarAxios } from "../../global";

/**
 * data: data type labors
 * @returns API Response, with the data of the type labors
 */
const getTypeLabors = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/works`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const postTypeLabors = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/works/register`, {
      "name": type.name,
      "description": type.description
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getTypeLabors, postTypeLabors };