import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { ref } from "vue";

export const useStorage = defineStore(
  "useStorage",
  () => {
    const token = ref();
    const loggedIn = ref(false);
    const idSelected = ref();
    const nameSelected = ref();

    const addStorage = (value) => {
      token.value = value;
      loggedIn.value = true;
    };

    const deleteStorage = () => {
      token.value = "";
      loggedIn.value = false;
      idSelected.value = "";
      nameSelected.value = "";
    };

    const decodeJwt = () => {
      let decoded = jwt_decode(token.value);
      return decoded;
    };

    const setFarm = (data) => {
      nameSelected.value = data;
      const storage = useStorage();
      const decodeToken = storage.decodeJwt();
      const farms = decodeToken.farms;

      const farmsExist = farms.forEach((item) => {
        if (item.name == data) {
          idSelected.value = item._id;
        }
      });
    };

    return {
      token,
      idSelected,
      nameSelected,
      loggedIn,
      addStorage,
      deleteStorage,
      decodeJwt,
      setFarm,
    };
  },
  { persist: true }
);
