import { sugarAxios } from "../../global";

/**
 * data: data Eps
 * @returns API Response, with the data of the Eps
 */
const getEps = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/eps`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postEps = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/eps/register`, {
      name: type.name,
      description: type.description,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getEps, postEps };
