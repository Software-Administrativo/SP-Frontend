import { sugarAxios } from "../../global";
import { getToken } from '@/helpers'

/**
 * data: data stages
 * @returns API Response, with the data of the stages
 */
const getStages = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/stages`,{
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

const postStages = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(`/maintenance/stages/register`, {
      name: type.name,
      description: type.description,
      father: type.father
    },{
      headers: {
        token:
          tokenExist,
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getStages, postStages };
