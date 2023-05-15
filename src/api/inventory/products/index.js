import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data products
 * @returns API Response, with the data of the products
 */
const getProducts = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/inventory/products`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};  

const postProduct = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/inventory/products/register`,
      {
        name: type.name,
        categories: type.categories,
        brand: type.brand,
        amount: type.amount,
      },
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateProduct = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/products/update/${item.id}`,
      {
        name: item.name,
        categories: item.categories,
        brand: item.brand,
        amount: item.amount,
      },
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const inactiveProduct = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/products/inactive/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const activeProduct = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/products/active/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getProducts, postProduct, inactiveProduct, activeProduct, updateProduct};
