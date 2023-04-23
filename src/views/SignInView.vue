<template>
  <div class="bg-login col-12 row">
    <div class="col-6 bg-white container">
      <div class="si-logo col-12 row q-mt-md q-ml-md"></div>
      <div class="form">
        <h2 class="q-mb-md">Bienvenido</h2>
        <h5 class="text-grey q-mt-xs q-mb-md">Ingresa a tu cuenta</h5>
        <Form @onForm="validateIfUserExist" :error="messageError"/>
      </div>
    </div>
  </div>
</template>

<script setup>
// Imports
import { ref } from "vue";
import { useRouter } from "vue-router";
import Form from "@/modules/sign-in/Form.vue";

// Data
const router = useRouter();
let messageError = ref()

// Function to receive the data from the form
const validateIfUserExist = ({typeDocument, documentUser, password}) => {
  if (typeDocument.value === null) {
    messageError.value = "El tipo de documento es requerido"
  } else if (documentUser.value === "") {
    messageError.value = "El número de documento es requerido"
  } else if (password.value === "") {
    messageError.value = "La contraseña es requerida"
  } else {
    // Here we can call the API to validate if the user exist, but in this case we just redirect to the home view if the user is 1234 and the password is 1234
    if (documentUser.value === "1234" && password.value === "1234") {
      router.push({ name: "home" });
    }
  }
}
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
  max-width: 600px;
  min-width: 300px;
  height: 20%;
}
.form {
  display: flex;
  flex-direction: column;
  width: 60%;
  max-width: 380px;
  min-width: 300px;
  margin: 0 auto;
}

@media (max-width: 700px){
  .container{
    width: 100vw;
  }
}
</style>
