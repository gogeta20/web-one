<script setup lang="ts">
import MaqintSelectAyuda from "@/core/layout/maqintLayout/components/Ayuda/MaqintSelectAyuda.vue";
import router from "@/core/router";
import Button from "primevue/button";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

function clickShowAyuda() {
  router.push("/axuda");
}
</script>

<template>
  <MaqintSelectAyuda>
    <Button class="p-button-text bh-control" @click="clickShowAyuda">
      <em class="glyphicon glyphicon-question-sign" style="font-size: 1.5rem" />
    </Button>
  </MaqintSelectAyuda>
</template>

<style lang="scss" scoped>
button {
  position: relative;
}

.title-list {
  font-weight: 900;
  font-size: small;
}
.mensaxe-list {
  color: var(--primary-color);
  font-size: small;
}
.created-list {
  color: rgb(112, 112, 112);
  font-size: small;
}
.scrollable-ul {
  width: 600px;
  height: 400px;
  overflow: auto;
}
.no-scrollable-ul {
  width: 200px;
  height: 80px;
  overflow: auto;
}
.list-loading {
  text-align: center;
  padding: 20px;
  color: var(--light-blue);
}
:deep(.p-button.p-button-text:enabled:hover.bh-control) {
  background: none;
  color: #888;
  border-color: transparent;
}

:deep(.p-button.p-button-text:enabled.bh-control) {
  background: none;
  color: var(--light-blue);
  border-color: transparent;
}

.bh-notification {
  user-select: none;
  position: absolute;
  top: 0;
  right: 4px;
  border-radius: 100%;
  background-color: var(--warning-color);
  color: #fff;
  font-size: 11px;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-transform: uppercase;
}

.bh-notification-zero {
  user-select: none;
  position: absolute;
  top: 0;
  right: 4px;
  border-radius: 100%;
  background-color: #ccc;
  color: #fff;
  font-size: 11px;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-transform: uppercase;
}

.bh-menu__item {
  display: flex;
  align-items: center;
  padding: 0.15rem;
  margin-top: 7px;
  gap: 0.5rem;
}

.bh-menu__item_no_lida {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-top: 7px;
  gap: 0.5rem;
  background-color: var(--bs-highlight-bg);
}

.bh-menu__lang {
  text-align: center;
  font-size: 0.875rem;
  background-color: #ccc;
  color: #fff;
  padding: 0 4px;
  min-width: 2rem;
  text-shadow: none;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.bh-menu__lang--active {
  background-color: var(--light-blue);
  color: #fff;
}

.bh-menu__text {
  font-weight: 700;
}
.min-w-200 {
  min-width: 150px;
}
</style>
