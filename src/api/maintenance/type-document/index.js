import { sugarAxios } from "../../global";

/**
 * data: data type document
 * @returns API Response, with the data of the type
 */
const getTypeDocument = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/typeDocument`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypeDocument = async (type) => {
  try {
    const { data } = await sugarAxios.post(
      `/maintenance/typeDocument/register`,
      {
        name: type.name,
        description: type.description,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getTypeDocument, postTypeDocument };
