<template>
  <div class="header">
    <q-toolbar>
      <q-btn
        flat
        round
        dense
        icon="menu"
        class="text-white"
        @click="toggle()"
        v-if="props.routename != 'configuration'"
      />
      <span class="name-farm">{{ nameFarm }}</span>
      <q-space></q-space>
      <q-btn
        flat
        round
        dense
        icon="logout"
        class="text-white"
        to="./"
        @click="logoutSession()"
      />
    </q-toolbar>
  </div>
</template>

<script setup>
import { menuState } from "@/stores/menu";
import { useStorage } from "@/stores/localStorage";
import { computed } from "vue";

const props = defineProps({
  routename: {
    type: String,
    required: false,
  },
});

const storage = useStorage();

const nameFarm = computed(() => {
  return storage.nameSelected;
});

const menu = menuState();
function toggle() {
  menu.toggleMenu();
}

const logoutSession = () => {
  if (menu.menuIsOpen == true) {
    menu.toggleMenu();
  }
  storage.deleteStorage();
};
</script>

<style scoped>
.header {
  background-color: var(--color-blue);
  width: 100%;
}
.name-farm {
  font-size: var(--font-subtitle);
  color: white;
  margin-left: 20px;
}
</style>
