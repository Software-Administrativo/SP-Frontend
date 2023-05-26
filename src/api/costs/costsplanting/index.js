import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data Costs Planting
 * @returns API Response, with the data of the Costs PLanting
 */

const getCostsPlanting = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/costs/costsplanting`, {
      headers: {
        token: tokenExist,
        farm: idFarm
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const postCostsPlanting = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/costs/costsPlanting/register`,
      {
        name: type.name,
        description: type.description,
        value: type.value,
      },
      {
        headers: {
          token: tokenExist,
          farm: idFarm
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const updateCostsPlanting = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/CostsPlanting/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        value: item.value,
      },
      {
        headers: {
          token: tokenExist,
          farm: idFarm
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const inactiveCostsPlanting = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/CostsPlanting/inactive/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
          farm: idFarm
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const activeCostsPlanting = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/CostsPlanting/active/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
          farm: idFarm
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export { getCostsPlanting, postCostsPlanting, inactiveCostsPlanting, activeCostsPlanting, updateCostsPlanting };
