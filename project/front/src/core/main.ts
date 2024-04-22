import App from "@/core/App.vue";
// import "@/core/assets/css/awesomeFont.css";
import "@/core/assets/css/variables.css";
import "@/core/assets/scss/main.scss";
import es from "@/core/i18n/locales/es.json";
import gl from "@/core/i18n/locales/gl.json";
import router from "@/core/router";
// import {
//   FontAwesomeIcon,
//   FontAwesomeLayers,
//   FontAwesomeLayersText,
// } from "@/core/utilities/fontawsome-icons";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { PiniaSharedState } from "pinia-shared-state";
import "primeicons/primeicons.css";
import BadgeDirective from "primevue/badgedirective";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import "primevue/resources/primevue.min.css";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";

const app = createApp(App);
const i18n = createI18n({
  legacy: false,
  locale: "gl",
  fallbackLocale: "gl",
  messages: {
    gl,
    es,
  },
  globalInjection: true,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(
  PiniaSharedState({
    // Enables the plugin for all stores. Defaults to true.
    enable: false,
    // If set to true this tab tries to immediately recover the shared state from another tab. Defaults to true.
    initialize: true,
    // Enforce a type. One of native, idb, localstorage or node. Defaults to native.
    type: "localstorage",
  })
);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.directive("badge", BadgeDirective);
app.directive("tooltip", Tooltip);

// app.component("FontAwesomeIcon", FontAwesomeIcon);
// app.component("FontAwesomeLayers", FontAwesomeLayers);
// app.component("FontAwesomeLayersText", FontAwesomeLayersText);

app.mount("#app");
