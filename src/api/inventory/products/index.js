import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";
import { useStorage } from "@/stores/localStorage.js";

/**
 * data: data products
 * @returns API Response, with the data of the products
 */
const getProducts = async () => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.get(`/inventory/product`, {
      headers: {
        token: tokenExist,
        farm: idFarm
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
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.post(
      `/inventory/product/register`,
      {
        name: type.name,
        category: type.category,
        brand: type.brand,
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
    console.error(error);
  }
};

const updateProduct = async (item) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
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
    console.error(error);
  }
};

const inactiveProduct = async (id) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/inventory/product/inactive/${id}`,
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
    console.error(error);
  }
};

const activeProduct = async (id) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/inventory/product/active/${id}`,
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
    console.error(error);
  }
};

export { getProducts, postProduct, inactiveProduct, activeProduct, updateProduct};
