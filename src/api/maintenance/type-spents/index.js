import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data type spents
 * @returns API Response, with the data of the type spents
 */

const getTypeSpents = async (idFarm) => {
  const tokenExist = getToken();
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

const postTypeSpent = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
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

const updateTypeSpent = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
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
};

const inactiveTypeSpent = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
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

const activeTypeSpent = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
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

export {
  getTypeSpents,
  postTypeSpent,
  activeTypeSpent,
  inactiveTypeSpent,
  updateTypeSpent,
};
