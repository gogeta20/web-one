<script setup lang="ts">
import { rootConfig } from "@/core/config/config";
import MaqintFooter from "@/core/layout/maqintLayout/components/MaqintFooter.vue";
import MaqintMain from "@/core/layout/maqintLayout/components/MaqintMain.vue";
import MaqintSidBar from "@/core/layout/maqintLayout/components/MaqintSidBar.vue";
import { useI18n } from "vue-i18n";
import {computed, ref} from "vue";
import {mainAppStore} from "@/auth/store/mainAppStore";
const { t } = useI18n();

const appStore = mainAppStore();
const nombreApp = ref(rootConfig.nombreAPP);
const versionApp = ref(rootConfig.version);
const sidebarVisible = computed(() => appStore.openSidebar)
</script>

<template>
  <div class="bh-wrapper">
    <main class="bh-main">
      <MaqintSidBar :is-open-side-bar="sidebarVisible"/>
      <MaqintMain>
        <RouterView />
      </MaqintMain>
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
      margin-left: calc(var(--sidbar-width) - 250px);
    }
  }
}

@media (min-width: 540px) {
  .bh-main {
    &__page {
      margin-left: var(--sidbar-width);

      &--full-width {
        margin-left: calc(var(--sidbar-width) - 250px);
      }
    }
  }
}
</style>
