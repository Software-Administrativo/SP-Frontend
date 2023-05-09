<template>
  <div class="q-mb-sm">
    <h6 class="q-my-lg title">{{ props.title }}</h6>
    <q-separator class="separator" />
    <div class="container-list q-mt-lg q-pa-md" rounded>
      <div
        class="item-list"
        v-for="(item, i) in props.items"
        :key="i"
        @click="goToModule(item.name)"
      >
        <i class="item-icon" v-bind:class="item.icon"></i>
        <p class="item-name">{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

const goToModule = (route) => {
  router.push({ name: route });
};
</script>

<style scoped>
.container-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(105px, 1fr));
  border-radius: 15px;
  padding: 10px 50px;
  padding-bottom: 35px;
  height: 100%;
  max-height: 80vh;
  margin-top: 0px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  /* border: 2px solid var(--color-gray); */
  box-shadow: 2px 3px 3px 0px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}
.container-list::-webkit-scrollbar {
  display: none;
}
.title {
  display: inline-block;
  margin-top: 40px;
  font-size: var(--font-title);
}
.separator {
  border: 1.8px solid var(--color-gray);
  margin-bottom: 20px;
}

.icon {
  color: var(--color-blue);
  font-size: var(--font-icon);
  margin-left: 10px;
  padding-top: 5px;
}

.item-list {
  display: flex;
  align-items: left;
  gap: 15px;
  padding: 20px;
  padding-bottom: 0px;
  border-bottom: 2px solid var(--color-gray);
}

.item-list:hover {
  cursor: pointer;
  background-color: var(--color-gray);
}

.item-name {
  font-size: var(--font-large);
  margin-left: 10px;
  padding-top: 8px;
}

@media (max-width: 600px) {
  .container-list {
    grid-template-columns: repeat(1, minmax(100px, 1fr));
    max-height: 70vh !important;
  }
}
</style>
