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
    console.error(error);
  }
};

const postUser = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/users/register`,
      {
        name: type.name,
        tpdocument: type.tpdocument,
        numdocument: type.numdocument,
        role: type.role,
        password: type.password,
      },
      {
        headers: {
          token: tokenExist,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
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
    console.error(error);
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
    console.error(error);
  }
};

export { getUsers, inactiveUser, activeUser, postUser };
