import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data type brands
 * @returns API Response, with the data of the type brands
 */
const getBrands = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/inventory/brands`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postBrand = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/inventory/brands/register`,
      {
        name: type.name,
        farm: type.farm,
        description: type.description,
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

const updateBrand = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/brands/update/${item.id}`,
      {
        name: item.name,
        farm: item.farm,
        description: item.description,
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

const inactiveBrand = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/brands/inactive/${id}`,
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

const activeBrand = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/brands/active/${id}`,
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

export { getBrands, postBrand, inactiveBrand, activeBrand, updateBrand};
