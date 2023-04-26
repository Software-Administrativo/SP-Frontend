import { sugarAxios } from "../../global";

/**
 * data: data type spents
 * @returns API Response, with the data of the type spents
 */
const getTypeSpents = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/spents`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypeSpents = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/spents/register`, {
      name: type.name,
      description: type.description,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getTypeSpents, postTypeSpents };
