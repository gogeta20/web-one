<script setup lang="ts">
import MaqintMenu from "@/core/layout/maqintLayout/components/MaqintMenu.vue";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
  isOpenSideBar: {
    type: Boolean,
  },
});
const myRoutes = reactive([
  {
    id: "1",
    title: t("router.home"),
    path: "/inicio",
    icon: "home",
    isVisible: true,
    children: [],
  },
  {
    id: "2",
    title: t("sidebar.solicitud.title"),
    path: "#",
    icon: "plus",
    isVisible: true,
    children: [
      {
        id: "2.0",
        title: t("sidebar.solicitud.po"),
        path: "/proxecto-ordenacion/alta",
        isVisible: true,
        children: [],
      },
      {
        id: "2.1",
        title: t("sidebar.solicitud.dsx"),
        path: "/doc-simple-xestion/alta",
        isVisible: true,
        children: [],
      },
      {
        id: "2.2",
        title: t("sidebar.solicitud.dcx"),
        path: "/doc-compartido-xestion/alta",
        isVisible: true,
        children: [],
      },
      {
        id: "2.3",
        title: t("sidebar.solicitud.ams"),
        path: "/modelo/ini",
        isVisible: false,
        children: [],
      },
      {
        id: "2.1",
        title: t("sidebar.solicitud.title"),
        path: "/solicitude/archivos",
        isVisible: false,
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
    children: [
      {
        id: "3.0",
        title: t("router.expedientes"),
        path: "/consulta/expedientes",
        isVisible: true,
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
    children: [],
  },
]);
</script>

<template>
  <aside class="bh-sidebar" :class="[{ 'bh-sidebar--hidden': isOpenSideBar }]">
    <nav class="bh-nav">
      <MaqintMenu :dataTree="myRoutes" :isOpenSideBar="isOpenSideBar" />
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.bh-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: var(--sidbar-width);
  background-color: var(--dark-gray);
  box-shadow: inset -5px 5px 18px -5px rgb(0 0 0 / 80%);
  overflow: auto;
  transition: left 0.4s ease 0s;
  z-index: 5;
  opacity: 0.9;

  &--hidden {
    left: -190px;
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

.bh-nav {
  &__list {
    list-style: none;
    padding: 0.2rem 0 0 0;
    margin: 0;
  }

  &__item {
    position: relative;
    display: block;
    color: #ffffff;
  }

  &__link {
    align-items: center;
    gap: 0.5rem;
    color: inherit;
    position: relative;
    display: flex;
    text-decoration: none;
    padding: 0.5rem 1rem;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.15s linear;

    &:hover {
      background-color: var(--light-blue);
    }

    &.router-link-exact-active {
      background-color: var(--light-blue);

      &:hover {
        background-color: #070b0e;
      }
    }

    .glyphicon {
      font-size: 0.991rem;
      margin-right: 0.5rem;
      top: 10px;
      line-height: 0;
      vertical-align: text-top;
      position: relative;
      color: #fff;
    }
  }

  :deep(.bh-nav__icon) {
    font-size: 1.2rem;
    color: #fff;
  }
}

.bh-nav__link svg {
  transition: all 0.4s ease;
}

.bh-nav__link svg.fa-chevron-down {
  position: absolute;
  right: 12px;
  left: auto;
}

.bh-collapse {
  transition: all 0.4s ease-out;
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.bh-open .bh-nav__link--dropdown {
  background-color: #074d8781;
}

svg.fa-chevron-down {
  top: 12px;
  transform: rotate(180deg);
}

.bh-open svg.fa-chevron-down {
  top: 12px;
  transform: initial;
}

.bh-open .bh-collapse {
  opacity: 1;
  height: auto;
}

.bh-collapse .bh-nav__link {
  padding-left: 3rem;
  text-align: center;
}

.bh-collapse .bh-nav__link:before {
  content: "•";
  position: absolute;
  top: 3px;
  left: 18.5px;
  width: 15px;
  height: 100%;
  font-size: 50px;
  line-height: 32px;
  z-index: 2;
  overflow: hidden;
}

.bh-collapse .bh-nav__link:after {
  content: "";
  position: absolute;
  top: 0;
  left: 26px;
  width: 1px;
  height: 100%;
  background-image: linear-gradient(to bottom, #ccc 50%, rgba(255, 255, 255, 0) 0);
  background-position: left;
  background-size: 1px 5px;
  background-repeat: repeat-y;
}

@media (min-width: 540px) {
  .bh-sidebar {
    opacity: 1;
  }
}
</style>
