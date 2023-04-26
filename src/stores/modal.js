// Importamos la función de Pinia para definir el store
import { defineStore } from "pinia";
import { ref } from "vue";

export const modalState = defineStore("modalState", () => {
  const modalIsOpen = ref(false);

  const toggleModal = () => {
    modalIsOpen.value = !modalIsOpen.value;
  };

  return { modalIsOpen, toggleModal };
});
