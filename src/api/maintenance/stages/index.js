import { sugarAxios } from "../../global";

/**
 * data: data stages
 * @returns API Response, with the data of the stages
 */
const getStages = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/stages`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

const postStages = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/stages/register`, {
      "name": type.name,
      "description": type.description,
      "father": type.father
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getStages, postStages };