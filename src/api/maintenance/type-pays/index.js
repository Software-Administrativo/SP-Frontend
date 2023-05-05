import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";

/**
 * data: data type pays
 * @returns API Response, with the data of the type pays
 */

const getTypePays = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/pays`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypePays = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/pays/register`,
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

const updateTypePay = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/pays/update/${item.id}`,
      {
        name: item.name,
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

const inactiveTypePay = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/pays/inactive/${id}`,
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

const activeTypePay = async (id) => {
  console.log(id);
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/pays/active/${id}`,
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

export {
  getTypePays,
  postTypePays,
  inactiveTypePay,
  activeTypePay,
  updateTypePay,
};
