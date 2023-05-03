import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data farm
 * @returns API Response, with the data of the farm
 */
const getFarm = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/farm`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postFarm = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/farm/register`,
      {
        name: type.name,
        description: type.description,
        nit: type.nit,
        ubication: type.ubication,
        miniumExistence: type.miniumExistence,
      },
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getFarm, postFarm };
