<script setup lang="ts">
//import Button from "primevue/button";
//import Button from "primevue/dialog";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type MyCallback = () => void;

type Props = {
  disabled: boolean;
  label: string;
  icon: string;
  disableButtonDialog?: boolean;
  myClass?: string;
};

interface Emits {
  (e: "onClick", closeModal: MyCallback): void;
}

const emit = defineEmits<Emits>();

withDefaults(defineProps<Props>(), {
  disabled: false,
  label: "",
  icon: "",
  disableButtonDialog: false,
  myClass: "",
});

const display = ref(false);
const loading = ref(false);

const openModal = () => {
  display.value = true;
};

const closeModal = () => {
  loading.value = false;
  display.value = false;
};

const onClick = (event: Event) => {
  event.preventDefault();
  loading.value = true;
  emit("onClick", closeModal);
  event.stopPropagation();
};
</script>

<template>
  <Button
    :disabled="disabled"
    :label="label"
    :icon="icon"
    :class="myClass"
    iconPos="left"
    @click="openModal" />
  <Dialog
    v-model:visible="display"
    :breakpoints="{ '960px': '75vw' }"
    :style="{ width: '30vw' }"
    :draggable="false"
    :closeOnEscape="false"
    :closable="false"
    :modal="true">
    <template #header>
      <h4>
        <slot name="header" class="field" />
      </h4>
    </template>
    <slot />
    <template #footer>
      <Button
        :label="t('core.buttons.cancel')"
        icon="pi pi-times"
        class="p-button-text"
        :disabled="loading"
        @click="closeModal" />
      <Button
        :label="t('core.buttons.save')"
        icon="pi pi-check"
        :disabled="disableButtonDialog"
        :loading="loading"
        @click="onClick" />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
h1 {
  color: #1d71b8;
  font-size: 1.6rem;
  font-weight: 600;
}

.field {
  display: flex;
  flex-direction: column;
}

.p-dialog .p-button {
  min-width: 6rem;
}
</style>
