import { getToken } from "@/helpers";
import { sugarAxios } from "../global";

/**
 * data: data users
 * @returns API Response, with the data of the orders
 */

const getOrders = async (idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.get(`/orders`, {
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

const postOrder = async (item, idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.post(
      `/orders/register`,
      {
        name: item.name,
        tpdocument: item.tpdocument,
        numdocument: item.numdocument,
        role: item.role,
        farms: [item.farms],
        email: item.email,
        password: item.password,
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

const updateOrder = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/orders/update/${item.id}`,
      {
        name: item.name,
        tpdocument: item.tpdocument,
        numdocument: item.numdocument,
        role: item.role,
        farms: [item.farms],
        email: item.email,
        password: item.password,
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

const inactiveOrder = async (id, idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.put(
      `/orders/inactive/${id}`,
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

const activeOrder = async (id, idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.put(
      `/orders/active/${id}`,
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

const payOrder = async (id, idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.put(
      `/orders/pay/${id}`,
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
}

export { getOrders, inactiveOrder, activeOrder, postOrder, updateOrder, payOrder };
