<script lang="ts" setup>
import MaqintHeader from "@/core/layout/maqintLayout/components/MaqintHeader.vue";
import {useUsuarioStore} from "@/auth/store/usuarioStore";
import MenuListBreadcrumb from "@/core/layout/maqintLayout/components/MenuListBreadcrumb.vue";
import {mainAppStore} from "@/auth/store/mainAppStore";
const appStore = mainAppStore();
</script>

<template>
  <section class="bh-main__page" :class="[{ 'bh-main__page--full-width': appStore.openSidebar }]">
    <MaqintHeader />
    <MenuListBreadcrumb/>
    <section class="bh-section-main">
      <slot />
    </section>
  </section>
</template>

<style lang="scss" scoped>

.bh-section-main {
  padding: 1rem;
  content-visibility: auto;
  contain-intrinsic-size: 1000px; /* Explained in the next section. */
  min-height: 81vh;
}

@media (min-width: 540px) {
}

:deep(.bh-breadcrumb__link) {
  font-weight: 700;
  font-size: 0.991rem;
}

:deep(.bh-breadcrumb__item:last-child .bh-breadcrumb__link) {
  color: #444;
}
.codigoInstrumento {
  min-width: 130px;
  overflow: hidden;
  font-weight: bold;
}
.tituloInstrumento {
  display: inline-block;
}
.tituloInstrumento .tooltiptext {
  visibility: hidden;
  /* width: 50%; */
  // background-color: var(--primary-color);
  background-color: #e4e6ed;
  color: #303030;
  text-align: center;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity 1s;
  border: solid 1px black;
}
.tituloInstrumento:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
