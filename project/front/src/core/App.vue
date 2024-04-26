<script setup lang="ts">
import { rootConfig } from "@/core/config/config";
// import { useMeToast } from "@/core/hooks/useMeToast";
// import { es } from "@/core/i18n/primeVue/es.json";
// import { gl } from "@/core/i18n/primeVue/gl.json";
import MaqintFinishSession from "@/core/layout/maqintLayout/components/MaqintFinishSession.vue";
import router from "@/core/router";
import { usePageLoadStore } from "@/core/stores/pageLoad";
// import { useToastStore } from "@/core/stores/toast";
import { useErrorStore } from "@/shared/store/errorStore";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { RouterView } from "vue-router";
import BasePageLoader from "./common/BasePageLoader.vue";
const errorStore = useErrorStore();
const { t, locale } = useI18n();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const language: { [key: string]: any | undefined } = {
//   es,
//   gl,
// };

const nombreApp = ref(rootConfig.nombreAPP);
const versionApp = ref(rootConfig.version);
const loadingPageLoader = ref(false);
const textPageLoader = ref("");
const pageLoadStore = usePageLoadStore();
// const toastStore = useToastStore();
// const { showToast, hiddenToast } = useMeToast();
const codeHttp = ref(false);
// const unsubscribe = toastStore.$onAction(({ args }) => {
//   const chttp = args[0].code;
//   if (errorStore.isError(chttp)) {
//     pageLoadStore.hiddenPageLoad();
//     pageLoadStore.hiddenLoadingBlock();
//   }
//   if (chttp == 401) {
//     codeHttp.value = true;
//     pageLoadStore.hiddenPageLoad();
//     pageLoadStore.hiddenLoadingBlock();
//   }
//   if (chttp == 403) {
//     errorStore.configError(chttp);
//     router.push(errorStore.getPath());
//   }
//   hiddenToast();
//   showToast(args[0]);
// });

// const changeToLocale = (newLocale: string) => {
//   primevue.config.locale = language[newLocale] || language.gl;
// };

// onUnmounted(() => {
//   unsubscribe();
// });
//
// onMounted(() => {
//   changeToLocale(locale.value);
// });

watch(pageLoadStore, ({ loadingPage, text }) => {
  loadingPageLoader.value = loadingPage;
  textPageLoader.value = text;
});

// watch(locale, (newLocale) => {
//   changeToLocale(newLocale);
// });
//
// defineExpose({
//   t,FontAwesomeIcon
// });
</script>
<template>
  <MaqintFinishSession v-model:visible="codeHttp" />

  <Transition name="fade" mode="out-in">
    <BasePageLoader :loading="loadingPageLoader" :text="textPageLoader" />
  </Transition>

  <router-view v-slot="{ Component }" :nombreApp="nombreApp" :versionApp="versionApp">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>