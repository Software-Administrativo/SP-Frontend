import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";

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
        farm: idFarm,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const postCostsPlanting = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/costs/costsplanting/register`,
      {
        name: item.name,
        description: item.description,
        lot: item.lot,
        worth: item.worth,
        spent: item.spent
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

const updateCostsPlanting = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/costsplanting/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        worth: item.worth,
        lot: item.lot,
        spent: item.spent
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

const inactiveCostsPlanting = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/costsplanting/inactivate/${id}`,
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

const activeCostsPlanting = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/costsplanting/activate/${id}`,
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

export {
  activeCostsPlanting, getCostsPlanting, inactiveCostsPlanting, postCostsPlanting, updateCostsPlanting
};

