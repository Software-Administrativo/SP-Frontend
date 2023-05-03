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

const postBrands = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/inventory/brands/register`,
      {
        name: type.name,
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

export { getBrands, postBrands };
