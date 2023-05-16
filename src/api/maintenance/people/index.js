import { getToken } from "@/helpers";
import { sugarAxios } from "../../global";

/**
 * data: data people
 * @returns API Response, with the data of the people
 */
const getPeople = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/people`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPeople = async (type) => {
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
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updatePeople = async (type) => {
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
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const inactivePeople = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/people/inactive/${id}`,
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

const activePeople = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/people/active/${id}`,
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

export { getPeople, postPeople, inactivePeople, activePeople, updatePeople};
