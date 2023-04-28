import { sugarAxios } from "../../global";

/**
 * data: data Lots
 * @returns API Response, with the data of the Lots
 */
const getLots = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/lots`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postLots = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/lots/register`, {
      name: type.name,
      description: type.description,
      size: type.size,
      state: type.state,
      soilState: type.soilState,
      class: type.class,
      father: type.father,
      plantingDensity: type.plantingDensity,
      plantsNumber: type.plantsNumber,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getLots, postLots };
