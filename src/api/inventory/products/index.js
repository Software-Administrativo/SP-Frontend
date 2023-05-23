import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data products
 * @returns API Response, with the data of the products
 */
const getProducts = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/inventory/product`, {
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

const postProduct = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/inventory/product/register`,
      {
        name: type.name,
        category: type.category,
        mark: type.mark,
        amount: type.amount,
        description: type.description,
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

const updateProduct = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/product/update/${item.id}`,
      {
        name: item.name,
        category: item.category,
        brand: item.brand,
        amount: item.amount,
        description: item.description,
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

const inactiveProduct = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/product/inactivate/${id}`,
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

const activeProduct = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/product/activate/${id}`,
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

export {
  getProducts,
  postProduct,
  inactiveProduct,
  activeProduct,
  updateProduct,
};
