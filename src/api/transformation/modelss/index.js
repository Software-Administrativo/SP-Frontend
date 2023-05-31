import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data transformation models
 * @returns API Response, with the data of the transformation models
 */

const getTransformationModels = async (idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/transformation/modeltrans`, {
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

const postTransformationModel = async (type, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/transformation/modeltrans/register`,
      {
        name: type.name,
        description: type.description,
        unitvalue: type.unitvalue,
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

const updateTransformationModel = async (item, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/transformation/modeltrans/update/${item.id}`,
      {
        name: item.name,
        description: item.description,
        unitvalue: item.unitvalue,
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

const inactiveTransformationModel = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/transformation/modeltrans/inactive/${id}`,
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

const activeTransformationModel = async (id, idFarm) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/transformation/modeltrans/active/${id}`,
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

export {
  getTransformationModels,
  postTransformationModel,
  inactiveTransformationModel,
  activeTransformationModel,
  updateTransformationModel,
};
