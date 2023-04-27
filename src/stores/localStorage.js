import { defineStore } from "pinia";

export const useStorage = defineStore("useStorage", {
  // Estado inicial
  state: () => ({
    data: JSON.parse(localStorage.getItem("tokens")) ?? [],
  }),
  getters: {
    getStorage(state) {
      return state.data;
    },
  },
  actions: {
    addStorage(token) {
      this.data.push(token);
      localStorage.setItem("tokens", JSON.stringify(this.data));
    },
    deleteStorage(token){
      localStorage.removeItem("tokens")
    }
  }
});