import { sugarAxios } from "../../global";
/**
 * data: data type brands
 * @returns API Response, with the data of the type brands
 */
const getBrands = async () => {
  try {
    const { data } = await sugarAxios.get(`/inventory/brands`, {
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDU5MTllODFkMjcxMjk4MGUyYmZmZCIsInJvbCI6IkFETUlOIiwiaWF0IjoxNjgyNDM0NTA1LCJleHAiOjE2ODUwMjY1MDV9.epJzUa97YpVVH1CAJkNj5I9G1zowY5YqwlIiaJGN_HI",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postBrands = async (type) => {
  try {
    const { data } = await sugarAxios.post(`/inventory/brands/register`, {
      name: type.name,
      description: type.description,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getBrands, postBrands };
