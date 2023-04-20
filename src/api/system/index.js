import { sugarAxios } from "../global";

/**
 * name: data users
 * @returns API Response, with the data of the users
 */
const getUsers = async () => {  
  try {
    const { data } = await sugarAxios.get(`/users`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export { getUsers };