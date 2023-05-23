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

const postPeople = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/people/register`,
      {
        document: type.document,
        name: type.name,
        lastName: type.lastName,
        description: type.description,
        birthDate: type.birthDate,
        phone: type.phone,
        bloodType: type.bloodType,
        peopleType: type.peopleType,
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
      `/maintenance/people/update`,
      {
        document: item.document,
        name: item.name,
        lastName: item.lastName,
        description: item.description,
        birthDate: item.birthDate,
        phone: item.phone,
        bloodType: item.bloodType,
        peopleType: item.peopleType,
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
