<script lang="ts" setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter, type RouteRecordName } from "vue-router";

const { t } = useI18n();

defineProps({
  nombreApp: {
    type: String,
    default: "",
  },
});
const router = useRouter();

function removeDuplicates<T, K extends keyof T>(data: T[], key: K) {
  return data.filter(
    (value, index, array) => array.findIndex((item) => item[key] === value[key]) === index
  );
}

function removeIdxf<T>(rr: T[]) {
  return rr.map((item) => {
    return { path: item.path.replace("/:idxf(\\d+)?", ""), name: item.name };
  });
}

const getRoutes = () => {
  const HIDDEN: RouteRecordName[] = ["", "Inicio", "home", "altas", "altaSolicitude"];
  const routes = router.currentRoute.value.matched
    .map(({ path, name }) => ({ path, name }))
    .filter(({ name }) => {
      if (name) {
        return !HIDDEN.includes(name);
      }
    });
  const routesClean = removeDuplicates(routes, "path");
  return removeIdxf(routesClean);
};
// const dataPO = ref(proyectoOrdenacion.data);
const dataPO = ref(true);

const existIdxf = computed(() => {
  return true;
});
</script>

<template>
  <header class="bh-header-main">
    <div class="d-flex justify-content-between">
      <div
        :class="{
          'bh-breadcrumb-container': Object.keys(dataPO).length > 0,
        }">
        <ol class="bh-breadcrumb">
          <li class="bh-breadcrumb__item">
            <router-link to="/" class="bh-breadcrumb__link">
              <i class="glyphicon glyphicon-home" aria-hidden="true" />
              <span class="sr-only">Inicio</span>
            </router-link>
          </li>
          <li class="bh-breadcrumb__item">
            <router-link to="/inicio" class="bh-breadcrumb__link">
              {{ nombreApp }}
            </router-link>
          </li>
          <li v-for="{ path, name } in getRoutes()" :key="path" class="bh-breadcrumb__item">
            <router-link :to="path" class="bh-breadcrumb__link">
              {{ t(`router.${name as string}`) }}
            </router-link>
          </li>
        </ol>
      </div>
      <div v-if="existIdxf" class="containerInstrumento" />
    </div>
  </header>
  <section class="bh-section-main">
    <slot />
  </section>
</template>

<style lang="scss" scoped>
.containerInstrumento {
  // display: flex;
  // gap: 0.5rem;
  width: 60%;
  height: 20px;
  flex-direction: row;
  justify-content: space-around;
  margin: auto 0;
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: 80% 1fr;
}
.bh-breadcrumb-container {
  width: 60%;
}
.bh-header-main {
  display: flex;
  flex-direction: column;
  padding: 0rem 3rem;
  background-color: #edeff5;

  h1 {
    color: #1d71b8;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 1rem 0;
    margin-bottom: 0px;
  }

  .bh-breadcrumb {
    display: none;
    flex-direction: row;
    padding: 0.5rem 1rem;
    margin: 0;
    list-style: none;

    a {
      color: inherit;
      text-decoration: inherit;
      text-transform: uppercase;
    }
  }
}

.bh-section-main {
  padding: 1rem;
  content-visibility: auto;
  contain-intrinsic-size: 1000px; /* Explained in the next section. */
  min-height: 81vh;
}

.bh-breadcrumb {
  &__item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-right: 0.25rem;
    width: max-content;
    width: -moz-max-content;

    .glyphicon-home {
      font-size: 1rem;
      background-color: #fff;
      border-radius: 1rem;
      border: 8px solid #fff;
      top: -1px;
    }
  }
}

@media (min-width: 540px) {
  .bh-header-main {
    h1 {
      padding: 0;
    }

    .bh-breadcrumb {
      display: flex;
    }
  }
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
.bh-breadcrumb > .bh-breadcrumb__item + .bh-breadcrumb__item:before {
  content: "\e258";
  padding: 0 2px 0 0;
  color: #ddd;
  font-size: 0.991rem;
  font-family: "Glyphicons Halflings", sans-serif;
}
</style>
