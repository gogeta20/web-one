<script setup lang="ts">
import MaqintSelectNotificaciones from "@/core/layout/maqintLayout/components/MaqintSelectNotificaciones.vue";
import { useNotifications } from "@/core/stores/NotificationsStore";
import type { Notificaciones } from "@/shared/dominio/notificaciones/Notificaciones";
import Button from "primevue/button";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const notificationsStore = useNotifications();
const numeroNotificaciones = computed(() => {
  return notificationsStore.numeroNotificaciones;
});
const notificaciones = computed(() => {
  return notificationsStore.notificaciones;
});
const loadingNotificaciones = computed(() => {
  return notificationsStore.loadingNotificaciones;
});

function classBhItem(notificacion: Notificaciones) {
  if (notificacion.lida === "1") {
    return "bh-menu__item";
  } else {
    return "bh-menu__item_no_lida";
  }
}

function handleClick(event: Event) {
  const enlace = event.target.closest("a");
  if (enlace) {
    window.location.assign(enlace.href);
  }
}

async function clickGetNotificaciones() {
  notificationsStore.getNotificaciones().then(() => {
    notificationsStore.putNotificacionesMarcarLidas();
  });
}

onMounted(() => {
  notificationsStore.getNumeroNotificacionesBucle();
});
</script>

<template>
  <MaqintSelectNotificaciones>
    <Button class="p-button-text bh-control" @click="clickGetNotificaciones">
      <em class="glyphicon glyphicon-bell" style="font-size: 1.5rem" />
      <span v-if="numeroNotificaciones === 0" class="bh-notification-zero">{{
        numeroNotificaciones
      }}</span>
      <span v-else class="bh-notification">{{ numeroNotificaciones }}</span>
    </Button>

    <template #menu>
      <div v-if="!loadingNotificaciones && notificaciones.length > 0">
        <ul class="scrollable-ul">
          <span class="strong subrayado">{{ "Notificaciones" }}</span>
          <li v-for="(notificacion, i) in notificaciones" :key="i">
            <div :class="classBhItem(notificacion)">
              <small class="bh-menu__text">
                <div class="title-list" v-text="notificacion.titulo" />
                <div
                  class="mensaxe-list"
                  @click.prevent="handleClick"
                  v-html="notificacion.mensaxe" />
                <div class="created-list" v-text="notificacion.created" />
              </small>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="!loadingNotificaciones && notificaciones.length === 0">
        <ul class="no-scrollable-ul">
          <span class="strong subrayado">{{ "Notificaciones" }}</span>
          <li>
            <div :class="'bh-menu__item'">
              <small class="bh-menu__text">
                <div class="title-list">{{ t("notificaciones.sin-resultados") }}.</div>
              </small>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="loadingNotificaciones">
        <ul>
          <li>
            <div class="list-loading">
              <i class="pi pi-spin pi-spinner" style="font-size: 3rem" />
            </div>
          </li>
        </ul>
      </div>
    </template>
  </MaqintSelectNotificaciones>
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
