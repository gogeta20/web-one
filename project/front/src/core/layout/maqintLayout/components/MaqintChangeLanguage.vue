<script setup lang="ts">
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { useI18nStore } from "@/core/i18n/store/i18nStore";
import MaqintSelect from "@/core/layout/maqintLayout/components//MaqintSelect.vue";
import { usePageLoadStore } from "@/core/stores/pageLoad";
import Button from "primevue/button";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t, locale } = useI18n();
const i18nStore = useI18nStore();
const usuarioStore = useUsuarioStore();
const pageLoadStore = usePageLoadStore();
const router = useRouter();
async function onChangeLangue(lang: string) {
  if (locale.value != lang) {
    pageLoadStore.showPageLoad();
    i18nStore.setLanguage(lang);
    locale.value = lang;
    usuarioStore.changeLanguage(lang);
    pageLoadStore.hiddenPageLoad();
    const nameRoute = router.currentRoute.value;
    await router.push(nameRoute.path);
  }
}

onMounted(() => {
  locale.value = i18nStore.getLanguage();
});
</script>

<template>
  <MaqintSelect>
    <Button class="p-button-text bh-control">
      <em class="glyphicon glyphicon-globe" style="font-size: 1.5rem" />
      <span class="bh-notification">{{ locale }}</span>
    </Button>

    <template #menu>
      <ul>
        <li>
          <div class="bh-menu__item" @click="onChangeLangue('es')" @keydown="onChangeLangue('es')">
            <span class="sr-only">Castellano</span>
            <span class="bh-menu__lang" :class="[{ 'bh-menu__lang--active': locale === 'es' }]">
              ES
            </span>
            <small class="bh-menu__text">
              {{ t("core.language.es") }}
            </small>
          </div>
        </li>
        <li>
          <div class="bh-menu__item" @click="onChangeLangue('gl')" @keydown="onChangeLangue('gl')">
            <span class="sr-only">Galego</span>
            <span class="bh-menu__lang" :class="[{ 'bh-menu__lang--active': locale === 'gl' }]">
              GA
            </span>
            <small class="bh-menu__text">
              {{ t("core.language.gl") }}
            </small>
          </div>
        </li>
      </ul>
    </template>
  </MaqintSelect>
</template>

<style lang="scss" scoped>
button {
  position: relative;
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
  background-color: #ccc;
  color: #fff;
  font-size: 10px;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-transform: uppercase;
  font-weight: 700;
}

.bh-menu__item {
  display: flex;
  align-items: center;
  padding: 0.15rem;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05);

    .bh-menu__lang {
      background-color: #666;
    }
  }
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
