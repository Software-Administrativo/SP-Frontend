import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";
import { useStorage } from "@/stores/localStorage.js";

/**
 * data: data type spents
 * @returns API Response, with the data of the type spents
 */

const getTypeSpents = async () => {
  const tokenExist = getToken();
  const storage = useStorage();
  const idFarm = storage.idSelected;
  try {
    const { data } = await sugarAxios.get(`/maintenance/spents`, {
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

const postTypeSpent = async (type) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.post(
      `/maintenance/spents/register`,
      {
        name: type.name,
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

const updateTypeSpent = async (item) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/spents/update/${item.id}`,
      {
        name: item.name,
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
}

const inactiveTypeSpent = async (id) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/spents/inactive/${id}`,
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

const activeTypeSpent = async (id) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/spents/active/${id}`,
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

export { getTypeSpents, postTypeSpent, activeTypeSpent, inactiveTypeSpent, updateTypeSpent};
