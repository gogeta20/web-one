<script setup lang="ts">
//import Button from "primevue/dialog";
import { useUsuarioStore } from "@/auth/store/usuarioStore";
const usuarioStore = useUsuarioStore();
interface Emits {
  (e: "update:visible", value: boolean): void;
}
const emit = defineEmits<Emits>();
defineProps({
  visible: {
    type: Boolean,
  },
});

const usuarioExterno = usuarioStore.isUserExtranet();
const telefono = usuarioExterno ? "012" : "981 545 288";
const email = usuarioExterno ? "012@xunta.es" : "cau@xunta.es";
function onVisibleDialog(value: boolean) {
  emit("update:visible", value);
}
</script>

<template>
  <Dialog
    :visible="visible"
    position="top"
    appendTo="self"
    :draggable="false"
    :keepInViewport="false"
    :breakpoints="{ '960px': '50vw', '640px': '100vw', '320px': '100vw' }"
    :style="{ maxWidth: '100%', minWidth: '40vw' }"
    :modal="true"
    @update:visible="onVisibleDialog">
    <template #header> <h4>Información de Contacto</h4> </template>

    <section>
      <div class="bh-dialog__item">
        <div class="bh-dialog__key">E-mail:</div>
        <div class="bh-dialog__value">
          <a href="mailto:cau@xunta.gal">{{ email }}</a>
        </div>
      </div>
      <div class="bh-dialog__item">
        <div class="bh-dialog__key">Teléfono:</div>
        <div class="bh-dialog__value">
          <a href="tel:981 5 45288">{{ telefono }}</a>
        </div>
      </div>
    </section>

    <hr />
    <div class="bh-dialog__item">
      <div class="bh-dialog__key">Outra información:</div>
      <div class="bh-dialog__value" />
    </div>

    <template #footer>
      <section class="text-right">
        <small>
          Axencia para a Modernización Tecnolóxica de Galicia (Amtega)<br />
          <strong>Xunta de Galicia</strong>
        </small>
      </section>
    </template>
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
