<template>
  <div class="bg-login col-12 row">
    <div class="col-6 bg-white">
      <div class="si-logo col-12 row q-mt-md q-ml-md"></div>
        <div class="form col-12">
          <h2 class="q-mb-md q-mr-xl">Bienvenido</h2>
          <h5 class="col-4 text-grey q-mt-xs q-mb-md q-mr-xl">Ingresa a tu cuenta</h5>
          <Form />
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
  background-size: 28%;
  height: 20%;
}
.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
  margin-left: 22%;
}


</style>
