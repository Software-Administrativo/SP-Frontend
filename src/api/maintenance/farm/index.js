import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data farm
 * @returns API Response, with the data of the farm
 */
const getFarms = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/farm`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const postFarm = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/farm/register`,
      {
        name: type.name,
        address: type.address,
        owner: type.owner,
      },
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const updateFarm = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/farm/update/${item.id}`,
      {
        name: item.name,
        address: item.address,
        owner: item.owner,
      },
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const inactiveFarm = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/farm/inactive/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const activeFarm = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/farm/active/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const getFarmId = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/farm/${id}`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export { getFarms, postFarm, updateFarm, inactiveFarm, activeFarm, getFarmId };
