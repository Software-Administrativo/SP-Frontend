import { defineStore } from "pinia";
import { ref } from "vue";

export const useStorage = defineStore("useStorage", () => {
  // State
  const token = ref(localStorage.getItem("token") ?? "");

  // Functions
  const addStorage = (value) => {
    token.value = value;
    localStorage.setItem("token", token.value);
  };

  const deleteStorage = () => {
    token.value = "";
    localStorage.removeItem("token");
  }

  return { token, addStorage, deleteStorage }
});