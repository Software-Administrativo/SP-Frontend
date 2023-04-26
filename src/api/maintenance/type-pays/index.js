import { sugarAxios } from "../../global";

/**
 * data: data type pays
 * @returns API Response, with the data of the type pays
 */
const getTypePays = async () => {
  try {
    const { data } = await sugarAxios.get(`/maintenance/pays`, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDU5MTllODFkMjcxMjk4MGUyYmZmZCIsInJvbCI6IkFETUlOIiwiaWF0IjoxNjgyNDM0NTA1LCJleHAiOjE2ODUwMjY1MDV9.epJzUa97YpVVH1CAJkNj5I9G1zowY5YqwlIiaJGN_HI",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postTypePays = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/maintenance/pays/register`, {
      name: type.name,
      description: type.description,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getTypePays, postTypePays };
