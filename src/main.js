// Importar las librerías de Vue, Vue Router y Quasar
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Dialog, Notify, Quasar } from "quasar";
import quasarLang from "quasar/lang/es";
import { createApp } from "vue";

// Import Quasar css
import "quasar/dist/quasar.css";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Importar el componente principal de la aplicación
import App from "./App.vue";
import router from "./routes";

// Pinia para manejar el estado de la aplicación
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Crear la instancia de Vue y pasarle el router y quasar
const myApp = createApp(App)
  .use(Quasar, { plugins: { Dialog, Notify }, lang: quasarLang })
  .use(router)
  .use(pinia);

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
