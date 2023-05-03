import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data type spents
 * @returns API Response, with the data of the type spents
 */
const getTypeSpents = async () => {
  const tokenExist = getToken();
  try {
    const { data } = await sugarAxios.get(`/maintenance/spents`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypeSpents = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/spents/register`,
      {
        name: type.name,
        description: type.description,
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

export { getTypeSpents, postTypeSpents };
