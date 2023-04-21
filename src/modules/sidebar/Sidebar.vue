<template>
  <div class="sidebar">
    <img
      src="../../assets/sidebar/user-image.svg"
      class="icon-user q-pt-md"
      width="40"
    />
    <h6 class="name-user text-center q-ma-none q-pb-sm">Laura Susano</h6>
    <q-separator class="separator" />
    <div v-for="item in paths">
      <RouterLink class="item" :to="item.path">
        <i v-bind:class="item.icon"></i>
        <h5 class="name">{{ item.name }}</h5>
      </RouterLink>
      <q-separator class="separator" />
    </div>
    <img
      src="../../assets/global/project-logo.svg"
      alt="logo"
      class="logo-global"
    />
  </div>
</template>

<script setup>
const paths = [
  {
    name: "Inicio",
    path: "/home",
    icon: "icon icon-home",
    rol: "user",
  },
  {
    name: "Mantenimiento",
    path: "/maintenance",
    icon: "icon icon-maintenance",
    rol: "user",
  },
  {
    name: "Inventario",
    path: "/inventory",
    icon: "icon icon-inventory",
    rol: "user",
  },
  {
    name: "Costos",
    path: "/cost",
    icon: "icon icon-cost",
    rol: "user",
  },
  {
    name: "Pedidos",
    path: "/order",
    icon: "icon icon-order",
    rol: "user",
  },
  {
    name: "Transformación",
    path: "/transformation",
    icon: "icon icon-transformation",
    rol: "user",
  },
  {
    name: "Reportes",
    path: "/report",
    icon: "icon icon-report",
    rol: "user",
  },
  {
    name: "Acceso al sistema",
    path: "/system",
    icon: "icon icon-system",
    rol: "admin",
  },
];
</script>

<style scoped>
.sidebar {
  margin-top: 50px;
  height: calc(100vh - 50px);
  width: 200px;
  border-right: 3px solid var(--color-gray);
  position: relative;
  background-color: white;
}
.separator {
  border: 1.8px solid var(--color-gray);
}
.item {
  text-decoration: none;
  display: flex;
  color: black;
}
.item:hover{
  background-color: var(--color-gray);
}
.name {
  margin-left: 20px !important;
  font-size: 12px;
  margin: 3px;
}
.icon-user {
  font-size: 35px;
  margin-left: calc(50% - 20px);
}
.name-user {
  font-size: 13px;
}
.logo-global {
  position: absolute;
  width: 60px;
  bottom: 20px;
  left: calc(50% - 30px);
}
.icon {
  font-size: 15px;
  color: var(--color-blue);
  margin-left: 10px;
  padding-top: 10px;
}
</style>
