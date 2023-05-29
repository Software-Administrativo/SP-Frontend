import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";

/**
 * data: data people
 * @returns API Response, with the data of the people
 */

const getPeople = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/people`, {
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

const postPeople = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/people/register`,
      {
        name: item.name,
        tpdct: item.tpdct,
        document: item.document,
        phone: item.phone,
        eps: item.eps,
        typePeople: item.typePeople,
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

const updatePeople = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/people/update/${item.id}`,
      {
        name: item.name,
        tpdct: item.tpdct,
        document: item.document,
        phone: item.phone,
        eps: item.eps,
        typePeople: item.typePeople,
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

const inactivePeople = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/people/inactive/${id}`,
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

const activePeople = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/people/active/${id}`,
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

export { getPeople, postPeople, inactivePeople, activePeople, updatePeople };
