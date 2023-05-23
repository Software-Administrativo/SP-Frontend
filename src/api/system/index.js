import { getToken } from "@/helpers";
import { sugarAxios } from "../global";

/**
 * data: data users
 * @returns API Response, with the data of the users
 */

const getUsers = async (idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.get(`/users`, {
      headers: {
        token: tokenExist,
        farm: idFarm,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const postUser = async (item, idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.post(
      `/users/register`,
      {
        name: item.name,
        tpdocument: item.tpdocument,
        numdocument: item.numdocument,
        role: item.role,
        farms: [ idFarm ],
        password: item.password,
      },
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const updateUserSystem = async (item, idFarm) => {
  console.log(item, idFarm);
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/pays/update/${item.id}`,
      {
        name: item.nameUserSystem,
        tpdocument: item.typeDocumentUserSystem,
        numdocument: item.numberDocumentUserSystem,
        role: item.roleUserSystem,
        farms: [ idFarm ],
        password: item.passwordUserSystem,
      },
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const inactiveUser = async (id, idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.put(
      `/users/inactive/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const activeUser = async (id, idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.put(
      `/users/active/${id}`,
      {},
      {
        headers: {
          token: tokenExist,
          farm: idFarm,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export { getUsers, inactiveUser, activeUser, postUser, updateUserSystem };
