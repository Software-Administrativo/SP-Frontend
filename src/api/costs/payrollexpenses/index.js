import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";

/**
 * data: data Costs Planting
 * @returns API Response, with the data of the Costs Payrolls
 */

const getCostsPayroll = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/payroll`, {
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

const postCostsPayroll = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/payroll/register`,
      {
        people: item.people,
        typepay: item.typepay,
        activity: item.activity,
        worth: item.worth,
        statuspay: item.statuspay
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

const updateCostsPayroll = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/payroll/update/${item.id}`,
      {
        people: item.people,
        typepay: item.typepay,
        activity: item.activity,
        worth: item.worth,
        statuspay: item.statuspay
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

const deleteCostsPayroll = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const data = await sugarAxios.delete(
      `/payroll/delete/${id}`,
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const payCostsPayroll = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/payroll/pay/${id}`,
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

const declineCostsPayroll = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/payroll/deliver/${id}`,
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

export { declineCostsPayroll, deleteCostsPayroll, getCostsPayroll, payCostsPayroll, postCostsPayroll, updateCostsPayroll };

