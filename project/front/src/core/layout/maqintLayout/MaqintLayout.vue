<script setup lang="ts">
import { rootConfig } from "@/core/config/config";
import MaqintFooter from "@/core/layout/maqintLayout/components/MaqintFooter.vue";
import MaqintHeader from "@/core/layout/maqintLayout/components/MaqintHeader.vue";
import MaqintMain from "@/core/layout/maqintLayout/components/MaqintMain.vue";
import MaqintSidBar from "@/core/layout/maqintLayout/components/MaqintSidBar.vue";
import BaseEnvironment from "@/core/common/BaseEnvironment.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
const { t } = useI18n();

const nombreApp = ref(rootConfig.nombreAPP);
const versionApp = ref(rootConfig.version);
const contorno = ref(rootConfig.contorno);
const name = t('core.contornoPruebas');
const isOpenSideBar = ref();
const openSidBar = async () => {
  isOpenSideBar.value = !isOpenSideBar.value;
};
</script>

<template>
  <div class="bh-wrapper">
    <BaseEnvironment :nombreApp="name" :environment="contorno" :versionApp="versionApp"/>
    <MaqintHeader :isOpenSideBar="isOpenSideBar" @menu-toggle="openSidBar" />

    <main class="bh-main">
      <MaqintSidBar :isOpenSideBar="isOpenSideBar" />
      <section class="bh-main__page" :class="[{ 'bh-main__page--full-width': isOpenSideBar }]">
        <MaqintMain :nombreApp="nombreApp">
          <RouterView />
        </MaqintMain>
      </section>
    </main>

    <MaqintFooter :nombreApp="nombreApp" :versionApp="versionApp" />
  </div>
</template>

<style lang="scss" scoped>
.bh-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.bh-main {
  flex: 1;
  position: relative;

  &__page {
    transition: margin-left 0.4s ease;
    margin-left: 0;

    &--full-width {
      margin-left: calc(var(--sidbar-width) - 190px);
    }
  }
}

@media (min-width: 540px) {
  .bh-main {
    &__page {
      margin-left: var(--sidbar-width);

      &--full-width {
        margin-left: calc(var(--sidbar-width) - 190px);
      }
    }
  }
}
</style>
