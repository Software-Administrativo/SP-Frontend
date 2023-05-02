import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { ref } from "vue";

export const useStorage = defineStore(
  "useStorage",
  () => {
    // State
    const token = ref();

    // Functions
    const addStorage = (value) => {
      token.value = value;
    };

    const deleteStorage = () => {
      token.value = "";
    };

    const decodeJwt = () => {
      let decoded = jwt_decode(token.value);
      return decoded;
    };

    return { token, addStorage, deleteStorage, decodeJwt };
  },
  { persist: true }
);
