import { sugarAxios } from "../../global";

/**
 * data: data people
 * @returns API Response, with the data of the people
 */
const getPeople = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/people`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postPeople = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/people/register`, {
      document: type.document,  
      name: type.name,
      lastName: type.lastName,
      description: type.description,
      birthDate: type.birthDate,
      phone: type.phone,
      bloodType: type.bloodType,
      peopleType: type.peopleType
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getPeople, postPeople };
