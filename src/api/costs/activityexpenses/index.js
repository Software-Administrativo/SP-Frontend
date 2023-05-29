import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data Activity Expenses
 * @returns API Response, with the data of the Activity Expenses
 */

const getActivityExpenses = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/costs/activityexpenses`, {
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

const postActivityExpenses = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/costs/activityexpenses/register`,
      {
        name: type.name,
        description: type.description,
        value: type.value,
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

const updateActivityExpenses = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/activityexpenses/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        value: item.value,
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

const inactiveActivityExpenses = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/activityexpenses/inactivate/${id}`,
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

const activeActivityExpenses = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/activityexpenses/activate/${id}`,
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
  getActivityExpenses,
  postActivityExpenses,
  inactiveActivityExpenses,
  activeActivityExpenses,
  updateActivityExpenses,
};
