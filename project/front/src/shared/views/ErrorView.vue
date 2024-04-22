<script setup lang="ts">
import { useErrorStore } from "@/shared/store/errorStore";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const errorStore = useErrorStore();
const messageError = computed(() => {
  return errorStore.message;
});
</script>

<template>
  <div class="main-template-error">
    <span class="message-error"
      ><i class="info-error fa fa-info-circle" /> {{ t(messageError) }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.message-error {
  border: solid 1px;
  border-color: var(--light-blue);
  padding: 60px;
  display: block;
}

.info-error {
  font-size: 1em;
  color: green;
}

.main-template-error {
  margin: 100px;
}
</style>
