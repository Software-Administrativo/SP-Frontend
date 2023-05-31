import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data transformation costs
 * @returns API Response, with the data of the transformation costs
 */

const getTransformationCosts = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/transformation/costtrans`, {
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

const postTransformationCost = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/transformation/costtrans/register`,
      {
        name: type.name,
        description: type.description,
        lot: type.lot,
        cost: type.cost,
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

const updateTransformationCost = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/transformation/costtrans/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        lot: item.lot,
        cost: item.cost,
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

const inactiveTransformationCost = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/transformation/costtrans/inactive/${id}`,
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

const activeTransformationCost = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/transformation/costtrans/active/${id}`,
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
  getTransformationCosts,
  postTransformationCost,
  inactiveTransformationCost,
  activeTransformationCost,
  updateTransformationCost,
};
