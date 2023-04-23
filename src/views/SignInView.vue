<template>
  <section class="row background-sugar">
    <div class="col-md-6 col-12 window-height bg-white q-pa-md">
      <div class="row">
        <img
          class="image-size"
          src="../assets/sign-in/sign-in-logo.svg"
          alt="Logo trapiche"
        />
      </div>
      <div class="form-container column justify-center items-center">
        <div class="form column">
          <h2 class="q-mb-md">Bienvenido</h2>
          <h5 class="text-grey q-mt-xs q-mb-md">Ingresa a tu cuenta</h5>
          <Form @onForm="validateIfUserExist" />
        </div>
      </div>
    </div>
    <div class="col-md-6 col-0 window-height"></div>
  </section>

  <!-- <ModalForm>
    <h1>Registrar Acceso</h1>
    <div class="row">
      <div class="col-3">
        <Select @onSelect="getSelectData" type="documents" label="Tipo"></Select>
      </div>
    </div>
  </ModalForm> -->

</template>

<script setup>
// Imports
import { useRouter } from "vue-router";
import { validateUser } from "@/api/sign-in";
import Form from "@/modules/sign-in/Form.vue";

// Data
const router = useRouter();

// Function to receive the data from the form
const validateIfUserExist = async (data) => {
  const validateDataUser = await validateUser(data);
  // router.push({ name: "home" });
};
</script>
<style scoped>
.background-sugar {
  background: url(../assets/sign-in/image-background.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

.image-size {
  width: 40%;
  max-width: 193px;
  height: 100%;
}

.form-container {
  height: calc(100% - 150px);
}

.form {
  width: 60%;
}

@media (max-width: 500px) {
  .form {
    width: 90%;
  }
}
</style>
