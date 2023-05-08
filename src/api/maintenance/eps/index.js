import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data Eps
 * @returns API Response, with the data of the Eps
 */
const getEps = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/eps`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postEps = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/eps/register`,
      {
        name: type.name,
        description: type.description,
        observation: type.observation,
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

const updateEps = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/eps/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        observation: item.observation,
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

const inactiveEps = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/eps/inactive/${id}`,
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

const activeEps = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/eps/active/${id}`,
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

export { getEps, postEps, inactiveEps, activeEps, updateEps};
