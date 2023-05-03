import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data units measurement
 * @returns API Response, with the data of the units measurement
 */
const getTypeUnitsMeasurement = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/unittypes`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypeUnitsMeasurement = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/unittypes/register`,
      {
        name: type.name,
        unittype: type.unittype,
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

export { getTypeUnitsMeasurement, postTypeUnitsMeasurement };
