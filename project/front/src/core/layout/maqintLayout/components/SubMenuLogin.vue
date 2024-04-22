<script setup lang="ts">
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { useI18nStore } from "@/core/i18n/store/i18nStore";
import MaqintSelect from "@/core/layout/maqintLayout/components/MaqintSelect.vue";
import Button from "primevue/button";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const i18nStore = useI18nStore();
const usuarioStore = useUsuarioStore();
async function onChangeLangue(lang: string) {
  locale.value = lang;
  usuarioStore.changeLanguage(lang);
}

onMounted(() => {
  locale.value = i18nStore.getLanguage();
});
</script>

<template>
  <nav>
    <ul class="bh-login-nav">
      <li>
        <MaqintSelect>
          <Button class="p-button-text bh-control">
            <li class="bh-login-nav__item header-lang-selector">
              <i class="glyphicon glyphicon-globe" style="font-size: 2rem" aria-hidden="true" />
              <span class="text-icons">
                {{ t("login.idiomas") }}
              </span>
            </li>
          </Button>

          <template #menu>
            <ul>
              <li>
                <div
                  class="bh-menu__item"
                  @click="onChangeLangue('es')"
                  @keydown="onChangeLangue('es')">
                  <span class="sr-only">Castellano</span>
                  <span
                    class="bh-menu__lang"
                    :class="[{ 'bh-menu__lang--active': locale === 'es' }]">
                    ES
                  </span>
                  <small class="bh-menu__text">
                    {{ t("core.language.es") }}
                  </small>
                </div>
              </li>
              <li>
                <div
                  class="bh-menu__item"
                  @click="onChangeLangue('gl')"
                  @keydown="onChangeLangue('gl')">
                  <span class="sr-only">Galego</span>
                  <span
                    class="bh-menu__lang"
                    :class="[{ 'bh-menu__lang--active': locale === 'gl' }]">
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
      </li>
      <li>
        <div class="p-button custom-div-fake-btn">
          <a href="#" data-toggle="modal" data-target="#modal-contact-info">
            <i class="glyphicon glyphicon-envelope" style="font-size: 2rem" aria-hidden="true" />
            <span class="text-icons">
              {{ t("login.contacto") }}
            </span>
          </a>
        </div>
      </li>
      <li>
        <div class="p-button custom-div-fake-btn">
          <a
            href="http://xuntatic.xunta.es/areasTIC/Modernizacion/Coordinaci%C3%B3n%20Web/Documentaci%C3%B3n%20operativa/MAQINT/GLOBAL_MU_ManualdeUsoMaquetaCorporativa_v.01.07.pdf"
            data-toggle="download-manual">
            <i
              class="glyphicon glyphicon-question-sign"
              style="font-size: 2rem"
              aria-hidden="true" />
            <span class="text-icons">
              {{ t("login.axuda") }}
            </span>
          </a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.bh-login-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 5rem 1rem 2rem;
}
.text-icons {
  padding-left: 8px;
  font-size: 14px;
}
.bh-login-nav li {
  display: flex;
  align-items: center;
  min-width: 80px;
}

.bh-login-nav a {
  text-decoration: none;
  display: flex;
  align-items: center;
  color: var(--primary-color) !important;
}

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

.custom-div-fake-btn {
  background: none;
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

.bh-login-nav__item {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: baseline;
  color: var(--primary-color);
  justify-content: center;
  font-size: 1rem;
  min-width: 80px;
}
.bh-login__item {
  min-width: clamp(300px, 90vw, 500px);
  background-color: #fff;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}
@media (max-width: 481px) {
  .text-icons {
    display: none;
  }
  .bh-menu__text {
    font-size: 9px;
  }
}
</style>
