<template>
  <div class="bg-login">
  </div>
  <Form />
</template>

<script setup>
import Form from "@/modules/sign-in/Form.vue";
</script>

<style scoped>
.bg-login{
  background: url(../assets/sign-in/image-background.png);
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}
</style>