import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";
import { useStorage } from "@/stores/localStorage.js";

/**
 * data: data type pays
 * @returns API Response, with the data of the type pays
 */

const getTypePays = async () => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.get(`/maintenance/pays`, {
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

const postTypePay = async (type) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.post(
      `/maintenance/pays/register`,
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

const updateTypePay = async (item) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/pays/update/${item.id}`,
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

const inactiveTypePay = async (id) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/pays/inactive/${id}`,
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

const activeTypePay = async (id) => {
  try {
    const tokenExist = getToken();
    const storage = useStorage();
    const idFarm = storage.idSelected;
    const { data } = await sugarAxios.put(
      `/maintenance/pays/active/${id}`,
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
  getTypePays,
  postTypePay,
  inactiveTypePay,
  activeTypePay,
  updateTypePay,
};
