import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data Lots
 * @returns API Response, with the data of the Lots
 */
const getLots = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/lots`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postLot = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/lots/register`,
      {
        name: type.name,
        areasize: type.areasize,
        lotestate: type.lotestate,
        soildstate: type.soildstate,
        classlote: type.classlote,
        sowingdensity: type.sowingdensity,
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

const updateLot = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/lots/update/${item.id}`,
      {
        name: item.name,
        areasize: item.areasize,
        lotestate: item.lotestate,
        soildstate: item.soildstate,
        classlote: item.classlote,
        sowingdensity: item.sowingdensity,
        description: item.description,
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

const inactiveLot = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/lots/inactive/${id}`,
      {},
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

const activeLot = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/lots/active/${id}`,
      {},
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

export { getLots, postLot, updateLot, inactiveLot, activeLot};
