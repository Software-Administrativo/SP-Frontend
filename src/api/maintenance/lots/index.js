import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data Lots
 * @returns API Response, with the data of the Lots
 */

const getLots = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/lots`, {
      headers: {
        token: tokenExist,
        farm: idFarm,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const postLot = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/lots/register`,
      {
        name: item.name,
        areasize: item.areasize,
        lotestate: item.lotestate,
        soildstate: item.soildstate,
        classlote: item.classlote,
        fatherlot: item.fatherlot,
        sowingdensity: item.sowingdensity,
        description: item.description,
      },
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const updateLot = async (item, idFarm) => {
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
        fatherlot: item.fatherlot,
        sowingdensity: item.sowingdensity,
        description: item.description,
      },
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const inactiveLot = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/lots/inactive/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const activeLot = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/lots/active/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export { getLots, postLot, updateLot, inactiveLot, activeLot };
