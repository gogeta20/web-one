<script setup lang="ts">
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { usePageLoadStore } from "@/core/stores/pageLoad";
import { UtilHelper } from "@/core/utilities/UtilHelper";
//import Button from "primevue/button";
//import Button from "primevue/dialog";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const usuarioStore = useUsuarioStore();
const pageLoadStore = usePageLoadStore();

defineProps({
  visible: {
    type: Boolean,
  },
});

const comfirmLogout = async () => {
  pageLoadStore.showPageLoad();
  pageLoadStore.sendMessage("Saliendo ...");
  UtilHelper.createCookie("redirectLogin", usuarioStore.datos.typeLogin);
  const url = await usuarioStore.logout();
  pageLoadStore.hiddenPageLoad();
  pageLoadStore.sendMessage("");
  window.location.assign(url);
};
</script>

<template>
  <Dialog
    :visible="visible"
    position="center"
    appendTo="self"
    :draggable="false"
    :closable="false"
    :keepInViewport="false"
    :breakpoints="{ '960px': '50vw', '640px': '100vw', '320px': '100vw' }"
    :style="{ maxWidth: '100%', minWidth: '40vw' }"
    :modal="true">
    <template #header>
      <div class="">
        <h4>Vai abandonar o programa</h4>
      </div>
    </template>
    <section>
      <div class="bh-dialog__item" />
      <div class="bh-logout">
        <Button
          class="p-button-info m-2"
          :label="t('core.buttons.ok')"
          iconPos="left"
          @click="comfirmLogout" />
      </div>
    </section>
  </Dialog>
</template>

<style lang="scss" scoped>
.bh-dialog__item {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}
.bh-dialog__key {
  flex: 0 0 20%;
  padding-right: 0.5rem;
  color: var(--primary-color);
  font-weight: 700;
  min-width: 150px;
}
.bh-dialog__value {
  flex: 1 1 auto;
}
</style>
