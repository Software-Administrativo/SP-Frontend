import { sugarAxios } from "../global";

/**
 * data: data users
 * @returns API Response, with the data of the users
 */
const getUsers = async () => {
  try {
    const { data } = await sugarAxios.get(`/users`, {
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

export { getUsers };
