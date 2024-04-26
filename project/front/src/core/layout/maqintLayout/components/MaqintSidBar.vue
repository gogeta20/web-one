<script setup lang="ts">
import MaqintMenu from "@/core/layout/maqintLayout/components/MaqintMenu.vue";
import {reactive, ref} from "vue";
import { useI18n } from "vue-i18n";
import {RouterLink} from "vue-router";
import {useUsuarioStore} from "@/auth/store/usuarioStore";
import {mainAppStore} from "@/auth/store/mainAppStore";
const { t } = useI18n();
const usuarioStore = useUsuarioStore();
const appStore = mainAppStore();
const nombreApp = "Mauricio";
defineProps({
  isOpenSideBar: {
    type: Boolean,
  },
});
const imgLogo = ref(
    usuarioStore.datos.typeLogin != "casExtranet"
        ? "/xorfor/images/xorfor-intranet-logo.png"
        : "/xorfor/images/xorfor-extranet-logo.png"
);
const myRoutes = reactive([
  {
    id: "1",
    title: t("router.home"),
    path: "/inicio",
    icon: "home",
    isVisible: true,
    children: [
      {
        id: "2.2",
        title: t("sidebar.solicitud.dcx"),
        path: "/doc-compartido-xestion/alta",
        isVisible: true,
        type: 'third',
        children: [],
      },
      {
        id: "2.3",
        title: t("sidebar.solicitud.ams"),
        path: "/modelo/ini",
        isVisible: false,
        children: [],
        type: 'third',
      },
      {
        id: "2.1",
        title: t("sidebar.solicitud.title"),
        path: "/solicitude/archivos",
        isVisible: false,
        children: [],
        type: 'third',
      },
    ],
    type: 'main'
  },
  {
    id: "2",
    title: t("sidebar.solicitud.title"),
    path: "#",
    icon: "plus",
    isVisible: true,
    type: 'main',
    children: [
      {
        id: "2.0",
        title: t("sidebar.solicitud.po"),
        path: "/proxecto-ordenacion/alta",
        isVisible: true,
        type: 'second',
        children: [],
      },
      {
        id: "2.1",
        title: t("sidebar.solicitud.dsx"),
        path: "/doc-simple-xestion/alta",
        isVisible: true,
        children: [],
      },
    ],
  },
  {
    id: "3",
    title: t("router.consulta"),
    path: "/consulta",
    icon: "search",
    isVisible: true,
    type: 'main',
    children: [
      {
        id: "3.0",
        title: t("router.expedientes"),
        path: "/consulta/expedientes",
        isVisible: true,
        type: 'second',
        children: [],
      },
      {
        id: "3.1",
        title: t("router.estado-tramitacion"),
        path: "/consulta/estado-tramitacion",
        isVisible: true,
        children: [],
      },
      {
        id: "3.2",
        title: t("router.expedientes-requerimiento"),
        path: "/consulta/expedientes-requerimiento",
        isVisible: true,
        type: 'second',
        children: [],
      },
    ],
  },
  {
    id: "4",
    title: t("router.consulta-modelos"),
    path: "/modelo/consulta",
    icon: "search",
    isVisible: true,
    type: 'main',
    children: [],
  },
]);
</script>

<template>
  <aside class="bh-sidebar" :class="[{ 'bh-sidebar--hidden': isOpenSideBar }]">
    <div  class="bh-header__logo">
      <router-link to="/inicio">
        <img v-if="appStore.logoImage" :alt="nombreApp" :src="imgLogo" lazy width="130" height="30" />
        <h1 v-else class="name-page-h1">{{ nombreApp }}</h1>
      </router-link>
    </div>
    <nav class="bh-nav">
      <MaqintMenu :dataTree="myRoutes" :isOpenSideBar="isOpenSideBar" />
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.bh-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  &__logo{
    border-bottom: solid 3px var(--light-gray-second);
    margin-bottom: 1rem;
  }
}

.bh-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: var(--sidbar-width);
  max-width: var(--sidbar-width);
  background-color: var(--dark-gray);
  box-shadow: inset -5px 5px 18px -5px rgb(0 0 0 / 80%);
  overflow: auto;
  transition: left 0.4s ease 0s;
  z-index: 5;
  opacity: 0.9;

  &--hidden {
    left: var(--sidbar-width-negative);
    overflow-y: auto;

    .bh-nav__list {
      width: 50px;
      margin-left: 190px;
    }

    .bh-nav__link {
      :deep(span) {
        display: none;
      }

      &.router-link-exact-active {
        display: block;
        transform: scale(1);
      }

      :deep(.bh-nav__icon) {
        color: #fff;
        text-align: center;
      }

      &:hover {
        :deep(.bh-nav__icon) {
          font-size: 1.4rem;
          color: #fff;
          text-shadow: 2px 2px rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
}

.name-page-h1{
  margin: 0;
  height: var(--header-height);
  font-size: 1.5rem;
  text-align: center;
  align-content: center;
  color: white;
  font-family: "Monospace", "Arial", "serif";
}

.bh-nav {
  :deep(.bh-nav__icon) {
    font-size: 1.2rem;
    color: #fff;
  }
}

@media (min-width: 540px) {
  .bh-sidebar {
    opacity: 1;
  }
}
</style>
