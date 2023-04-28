import { sugarAxios } from "../../global";

/**
 * data: data farm
 * @returns API Response, with the data of the farm
 */
const getFarm = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/farm`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postFarm = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/farm/register`, {
      name: type.name,
      description: type.description,
      nit: type.nit,
      ubication: type.ubication,
      miniumExistence: type.miniumExistence,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getFarm, postFarm };
