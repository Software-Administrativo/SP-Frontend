<template>
  <div class="sidebar">
    <img src="../../assets/sidebar/user-image.svg" class="icon-user q-pt-lg q-pb-sm" width="60">
    <h6 class="q-ma-none q-py-xs q-pb-md text-center nameUser">Laura Susano</h6>
    <q-separator/>
    <div v-for="(item) in paths">
      <RouterLink class="item" :to="item.path">
        <h5 class="name">{{ item.name }}</h5>
      </RouterLink>
      <q-separator/>
    </div>
  </div>
</template>

<script setup>
const paths = [
  {
    name: "Inicio",
    path: "/home",
    rol: "user",
  },
  {
    name: "Mantenimiento",
    path: "/maintenance",
    rol: "user",
  },
  {
    name: "Inventario",
    path: "/inventory",
    rol: "user",
  },
  {
    name: "Costos",
    path: "/cost",
    rol: "user",
  },
  {
    name: "Pedidos",
    path: "/order",
    rol: "user",
  },
  {
    name: "Transformación",
    path: "/transformation",
    rol: "user",
  },
  {
    name: "Reportes",
    path: "/report",
    rol: "user",
  },
  {
    name: "Acceso al sistema",
    path: "/system",
    rol: "admin",
  },
];
</script>

<style scoped>
.sidebar {
  margin-top: 50px;
  height: calc(100vh - 50px);
  width: 200px;
  border: 2px rgba(128, 128, 128, 0.116) solid;
}
.item {
  margin-top: 5px;
  text-decoration: none;
}
.name {
  margin-left: 30px !important;
  font-size: 15px;
  color: black;
  margin: 10px;
}
.icon-user{
  color: white;
  font-size: 35px;
  margin-left: calc(50% - 29px);
}
.nameUser{
  font-size: 15px;
}
</style>