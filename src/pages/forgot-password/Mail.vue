<template>
  <section class="row background-sugar">
    <div class="col-md-6 col-12 window-height bg-white q-pa-md">
      <div class="row">
        <i class="icon icon-backRoute q-pt-lg" @click="$router.back()" />
        <img
          class="image-size"
          src="../../assets/sign-in/sign-in-logo.svg"
          alt="Logo trapiche"
        />
      </div>
      <div class="form-container column justify-center items-center">
        <div class="form column">
          <h3 class="q-mb-md">Recupera tu contraseña</h3>
          <h5 class="text-grey q-mt-xs q-mb-md">Ingresa tu email</h5>
          <Email
            label="Email"
            :required="true"
            :value="valueEmail"
            v-model="email"
            @onEmail="getInputEmail"
          />
          <span class="invalidateData" v-if="props.error"
            >Credenciales Incorrectas</span
          >
          <template v-if="isInactive">
            <q-btn
              disable
              @click="postDataEmail"
              class="btn-login text-white full-width q-mt-lg"
              >Enviar</q-btn
            >
          </template>
          <template v-else>
            <q-btn
              @click="postDataEmail"
              class="btn-login text-white full-width q-mt-lg"
              >Enviar</q-btn
            >
          </template>
          <div class="spinner" v-if="isLoading">
            <q-spinner-ios color="primary" size="2.5em" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-0 window-height"></div>
  </section>
</template>

<script setup>
import { postForgotPassword } from "@/api/system";
import { ref, computed } from "vue";
import Email from "@/commons/forms/Email.vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const email = ref("");
const $router = useRouter();

const valueEmail = ref("");

const isInactive = computed(() => {
  return email.value === "";
});

const props = defineProps({
  error: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isLoading = ref(false);

const getInputEmail = (value) => {
  email.value = value;
};

const showNotification = (type, message) => {
  $q.notify({
    type: type,
    message: message,
    position: "top",
  });
};

async function postDataEmail() {
  isLoading.value = true;
  try {
    await postForgotPassword({
      email: email.value,
    });
    isLoading.value = false;
    showNotification("positive", "Email enviado correctamente");
    setTimeout(() => {
      $router.back();
    }, 2000);
  } catch {
    isLoading.value = false;
    showNotification(
      "negative",
      "Ocurrió un error, por favor verifique los datos"
    );
  }
}
</script>
<style scoped>
.background-sugar {
  background: url(../../assets/sign-in/image-background.png);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}

.image-size {
  margin-top: 1%;
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
.btn-login {
  background-color: #0068a5;
}
.spinner {
  margin: 0 auto;
  margin-top: 25px;
}
.icon-backRoute {
  font-size: 30px;
  padding-right: 20px;
}

.icon-backRoute:hover {
  cursor: pointer;
}
.invalidateData {
  background-color: rgba(255, 0, 0, 0.288);
  border-radius: 5px;
  padding: 5px 15px;
}

@media (max-width: 500px) {
  .form {
    width: 90%;
  }
}
</style>
