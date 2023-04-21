<template>
  <div class="q-py-md">
    <h6 class="q-my-lg">MANTENIMIENTO</h6>
    <q-separator class="separator" />
    <div class="container-list q-mt-lg q-pa-md" rounded>
      <div class="item-list" v-for="item in paths">
        <i class="item-icon" v-bind:class="item.icon"></i>
        <p class="item-name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const paths = [
  {
    name: "Tipo pagos",
    icon: "icon icon-type-money",
  },
  {
    name: "Tipo gastos",
    icon: "icon icon-cost",
  },
  {
    name: "Tipo labores",
    icon: "icon icon-type-labors",
  },
  {
    name: "Unidades de medida",
    icon: "icon icon-unit-extent",
  },
  {
    name: "EPS",
    icon: "icon icon-eps",
  },
  {
    name: "Tipo de documento",
    icon: "icon icon-type-document",
  },
  {
    name: "Lotes",
    icon: "icon icon-lots",
  },
  {
    name: "Etapas",
    icon: "icon icon-tages",
  },
  {
    name: "Finca",
    icon: "icon icon-create-estate",
  },
  {
    name: "Personas",
    icon: "icon icon-persons",
  },
];
</script>
<style scoped>
.icon {
  color: var(--color-blue);
  font-size: 15px;
  margin-left: 10px;
  padding-top: 10px;
}
.container-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(230px, 1fr));
  border-radius: 15px;
  padding: 30px;
  height: 100%;
  max-height: 50vh;
  border: 2px solid var(--color-gray);
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.item-list {
  display: flex;
  align-items: left;
  gap: 15px;
  padding: 10px;
  padding-bottom: 0px;
  border-bottom: 2px solid var(--color-gray);
}
.item-list:hover{
  cursor: pointer;
  background-color: var(--color-gray);
}
.item-name {
  font-size: 15px;
  margin-left: 10px;
  padding-top: 8px;
}
</style>
