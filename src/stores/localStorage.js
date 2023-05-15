import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { ref } from "vue";

export const useStorage = defineStore(
  "useStorage",
  () => {
    // State
    const token = ref();
    const loggedIn = ref(false);

    // Functions
    const addStorage = (value) => {
      token.value = value;
      loggedIn.value = true;
    };

    const deleteStorage = () => {
      token.value = "";
      loggedIn.value = false;
    };

    const decodeJwt = () => {
      let decoded = jwt_decode(token.value);
      return decoded;
    };

    return { token, loggedIn, addStorage, deleteStorage, decodeJwt };
  },
  { persist: true }
);
