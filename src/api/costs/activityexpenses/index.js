import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";

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

const postActivityExpenses = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/costs/activityexpenses/register`,
      {
        name: item.name,
        description: item.description,
        worth: item.worth,
        work: item.work,
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

const updateActivityExpenses = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/costs/activityexpenses/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        worth: item.worth,
        work: item.work,
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
  activeActivityExpenses, getActivityExpenses, inactiveActivityExpenses, postActivityExpenses, updateActivityExpenses
};

