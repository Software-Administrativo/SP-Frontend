import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";
import { useStorage } from "@/stores/localStorage.js";

/**
 * data: data Eps
 * @returns API Response, with the data of the Eps
 */
const getEps = async () => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.get(`/maintenance/eps`, {
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

const postEps = async (type) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
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
          farm: idFarm
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
    const storage = useStorage();
    const idFarm = storage.idSelected;
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
          farm: idFarm
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
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/eps/inactive/${id}`,
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

const activeEps = async (id) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/eps/active/${id}`,
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

export { getEps, postEps, inactiveEps, activeEps, updateEps};
