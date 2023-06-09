// Importamos la función de Pinia para definir el store
import { defineStore } from "pinia";
import { ref } from "vue";

export const modalShowState = defineStore("modalShowState", () => {
  const modalShowIsOpen = ref(false);

  const toggleSHowDetailsModal = () => {
    modalShowIsOpen.value = !modalShowIsOpen.value;
  };

  return { modalShowIsOpen, toggleSHowDetailsModal };
});