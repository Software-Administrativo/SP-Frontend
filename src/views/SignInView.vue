<template>
  <div class="bg-login col-12 row">
    <div class="col-6 bg-white row">
      <div class="si-logo col-12 q-mt-md q-ml-md"></div>
      <div class="col-12">
        <h2>Bienvenido</h2>
        <Form class="form row items-center" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Form from "@/modules/sign-in/Form.vue";
</script>

<style scoped>
.bg-login {
  background: url(../assets/sign-in/image-background.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

.si-logo {
  background-image: url(../assets/sign-in/sign-in-logo.png);
  background-repeat: no-repeat;
  
}
.form{
  justify-content: center;
}

</style>
