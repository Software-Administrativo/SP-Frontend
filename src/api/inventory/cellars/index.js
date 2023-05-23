import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data cellars
 * @returns API Response, with the data of the cellars
 */

const getCellars = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/inventory/cellar`, {
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

const postCellar = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/inventory/cellar/register`,
      {
        name: type.name,
        tpcontrato: type.tpcontrato,
        description: type.description,
        valor : type.valor,
      },
      {
        headers: {
          token: tokenExist,
          farm:idFarm
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const updateCellar = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/cellar/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        tpcontrato: item.typecontract,
        valor: item.value,
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

const inactiveCellar = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/cellar/inactive/${id}`,
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

const activeCellar = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/cellar/activate/${id}`,
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

export { getCellars, postCellar, inactiveCellar, activeCellar, updateCellar };
