import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";

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
        farm: idFarm,
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
        worth: type.worth,
        spent: type.spent
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

const updateAdminExpenses = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/adminexpenses/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
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

const inactiveAdminExpenses = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/adminexpenses/inactivate/${id}`,
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

const activeAdminExpenses = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/adminexpenses/activate/${id}`,
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
  activeAdminExpenses, getAdminExpenses, inactiveAdminExpenses, postAdminExpenses, updateAdminExpenses
};

