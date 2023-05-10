import { getToken } from "@/helpers";
import { sugarAxios } from "../global";

/**
 * data: data users
 * @returns API Response, with the data of the users
 */
const getUsers = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/users`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

const postUser = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/users/register`,
      {
        name: item.name,
        tpdocument: item.tpdocument,
        numdocument: item.numdocument,
        role: item.role,
        password: item.password,
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

const updateUserSystem = async (item) => {
  console.log(item);
  // try {
  //   const tokenExist = getToken();
  //   const { data } = await sugarAxios.put(
  //     `/maintenance/pays/update/${item.id}`,
  //     {
  //       name: item.nameUserSystem,
  //       tpdocument: item.typeDocumentUserSystem,
  //       numdocument: item.numberDocumentUserSystem,
  //       role: item.roleUserSystem,
  //       password: item.passwordUserSystem,
  //     },
  //     {
  //       headers: {
  //         token: tokenExist,
  //       },
  //     }
  //   );
  //   return data;
  // } catch (error) {
  //   console.error(error);
  // }
};

const inactiveUser = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/users/inactive/${id}`,
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

const activeUser = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/users/active/${id}`,
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

export { getUsers, inactiveUser, activeUser, postUser, updateUserSystem };
