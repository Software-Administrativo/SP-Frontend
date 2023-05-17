import { sugarAxios } from "../../global";
import { getToken } from "@/helpers";

/**
 * data: data units measurement
 * @returns API Response, with the data of the units measurement
 */
const getUnitsMeasurement = async () => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.get(`/maintenance/unittypes`, {
      headers: {
        token: tokenExist,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

const postUnitMeasurement = async (type) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.post(
      `/maintenance/unittypes/register`,
      {
        name: type.name,
        unittype: type.unittype,
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

const updateUnitMeasurement = async (item) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/unittypes/update/${item.id}`,
      {
        name: item.name,
        unittype: item.unittype,
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

const inactiveUnitMeasurement = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/unittypes/inactive/${id}`,
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

const activeUnitMeasurement = async (id) => {
  try {
    const tokenExist = getToken();
    const { data } = await sugarAxios.put(
      `/maintenance/unittypes/active/${id}`,
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

export {
  getUnitsMeasurement,
  postUnitMeasurement,
  activeUnitMeasurement,
  inactiveUnitMeasurement,
  updateUnitMeasurement,
};
