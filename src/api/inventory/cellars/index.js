import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data cellars
 * @returns API Response, with the data of the cellars
 */
const getCellars = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/inventory/cellars`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postCellar = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/inventory/cellars/register`,
      {
        name: type.name,
        farm: type.farm,
        typecontract: type.typecontract,
        description: type.description,
        value: type.value,
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

const updateCellar = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/cellars/update/${item.id}`,
      {
        name: item.name,
        farm: item.farm,
        typecontract: item.typecontract,
        description: item.description,
        value: item.value,
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

const inactiveCellar = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/cellars/inactive/${id}`,
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

const activeCellar = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/inventory/cellars/active/${id}`,
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

export { getCellars, postCellar, inactiveCellar, activeCellar, updateCellar };
