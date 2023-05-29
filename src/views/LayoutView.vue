<template>
  <q-layout class="container-view">
    <Header v-if="routeName != 'sign-in'"></Header>
    <div class="row">
      <Sidebar
        class="col-2"
        @onRoute="clickButton($event)"
        :style="sidebar"
        v-if="menu.menuIsOpen == true && routeName != 'sign-in'"
      ></Sidebar>
      <DefaultSidebar
        v-if="
          isUserLoggedIn && menu.menuIsOpen == false && routeName != 'sign-in'
        "
      ></DefaultSidebar>
      <div :style="viewRouter">
        <div :style="viewContainer">
          <router-view></router-view>
          <template v-if="selectFarm !== false">
            <ModalForm show="false">
              <div class="column q-px-xl q-pt-lg q-mb-sm">
                <span class="title-farm">Para continuar</span>
                <q-separator class="separator" />
                <span class="text-farm"
                  >Seleccione la finca a administrar:</span
                >
                <Select
                  class="select-farm"
                  @onSelect="getSelectData"
                  type="farms"
                  label="Finca"
                  message="Finca requerida"
                ></Select>
                <ButtonSave
                  :disable="disableSave"
                  @onClick="saveInfo"
                  class="q-mt-md"
                />
              </div>
            </ModalForm>
          </template>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script setup>
import Header from "@/modules/header/Header.vue";
import Sidebar from "@/modules/sidebar/Sidebar.vue";
import { menuState } from "@/stores/menu";
import { computed, ref, onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import DefaultSidebar from "../modules/sidebar/DefaultSidebar.vue";
import { useStorage } from "@/stores/localStorage";
import ModalForm from "@/modules/global/ModalForm.vue";
import Select from "@/commons/forms/Select.vue";
import ButtonSave from "@/commons/forms/ButtonSave.vue";

const menu = menuState();
const storage = useStorage();
const selectFarm = ref(false);
const farmSelected = ref("");
const disableSave = ref(true);

const getSelectData = (value) => {
  farmSelected.value = value;
  disableSave.value = false;
};

const saveInfo = () => {
  storage.setFarm(farmSelected.value);
  selectFarm.value = false;
  disableSave.value = true;
};

const isUserLoggedIn = computed(() => {
  if (storage.loggedIn == true && !storage.idSelected) {
    selectFarm.value = true;
  } else {
    selectFarm.value = false;
  }
  return storage.loggedIn;
});

const routeName = computed(() => {
  return useRoute().name;
});

const viewRouter = computed(() => {
  if (menu.menuIsOpen && routeName.value != "sign-in") {
    return "width: calc(100% - 230px); min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  } else if (
    !menu.menuIsOpen &&
    isUserLoggedIn &&
    routeName.value != "sign-in"
  ) {
    return "width: calc(100% - 70px); min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  }
});

const viewContainer = computed(() => {
  if (routeName.value == "sign-in") {
    return "width: 100vw; min-width: 300px; overflow: hidden; display: grid; justify-items: center;";
  } else {
    return "width: 90%; max-width: 1500px;";
  }
});

const sidebar = computed(() => {
  if (window.screen.width < 680) {
    if (menu.menuIsOpen) {
      return "width: 100%";
    }
  }
});

function clickButton() {
  if (window.screen.width < 680) {
    if (menu.menuIsOpen) {
      menu.toggleMenu();
    }
  }
}
</script>

<style scoped>
.container-view {
  background-color: #f3f1f785;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.text-farm {
  font-size: var(--font-medium);
  padding: 10px 0;
}
.title-farm {
  font-size: var(--font-subtitle);
}
.title {
  font-size: var(--font-title);
}
.separator {
  border: 1.8px solid var(--color-gray);
}
</style>
