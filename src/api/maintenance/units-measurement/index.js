import { sugarAxios } from "../../global";

/**
 * data: data units measurement
 * @returns API Response, with the data of the units measurement
 */
const getTypeUnitsMeasurement = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/unittypes`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypeUnitsMeasurement = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/unittypes/register`, {
      name: type.name,
      description: type.description,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getTypeUnitsMeasurement, postTypeUnitsMeasurement };
