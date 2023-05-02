import { sugarAxios } from "../../global";
import { getToken } from '@/helpers'

/**
 * data: data type labors
 * @returns API Response, with the data of the type labors
 */
const getTypeLabors = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/works`,{
      headers: {
        token:
          tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypeLabors = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(`/maintenance/works/register`, {
      name: type.name,
      description: type.description
    },{
      headers: {
        token:
          tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getTypeLabors, postTypeLabors };
