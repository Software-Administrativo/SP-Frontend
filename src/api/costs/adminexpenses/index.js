import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data Admin Expenses
 * @returns API Response, with the data of the Admin Expenses
 */

const getAdminExpenses = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/costs/adminexpenses`, {
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

const postAdminExpenses = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/costs/adminexpenses/register`,
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

const updateAdminExpenses = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/adminexpenses/update/${item.id}`,
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

const inactiveAdminExpenses = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/adminexpenses/inactive/${id}`,
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

const activeAdminExpenses = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/adminexpenses/active/${id}`,
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

export { getAdminExpenses, postAdminExpenses, inactiveAdminExpenses, activeAdminExpenses, updateAdminExpenses };
