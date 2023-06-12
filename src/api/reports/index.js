import { getToken } from "@/helpers";
import { sugarAxios } from "../global";

/**
 * data: data users
 * @returns API Response, with the data of the users
 */

const getDoughnut = async (idFarm) => {
  try {
    const tokenExist = getToken();

    const { data } = await sugarAxios.get(`/reports/currentmonth`, {
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

const postAllordersyear = async (idFarm) => {
  try {
    const tokenExist = getToken();

    const data = await sugarAxios.post(
      `/reports/allordersyear`,
      {
        year: "2023"
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


export {
  getDoughnut,
  postAllordersyear
};
