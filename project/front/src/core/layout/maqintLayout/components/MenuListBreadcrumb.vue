<script setup lang="ts">
import { RouterLink, useRouter, type RouteRecordName } from "vue-router";
import {computed, ref} from "vue";
import {rootConfig} from "@/core/config/config";
import {useI18n} from "vue-i18n";

const router = useRouter();
const { t } = useI18n();
const dataPO = ref(true);
const nombreApp = ref(rootConfig.nombreAPP);
const getRoutes = () => {
  const HIDDEN: RouteRecordName[] = ["","home"];
  const routes = router.currentRoute.value.matched
      .map(({ path, name }) => ({ path, name }))
      .filter(({ name }) => {
        if (name) {
          return !HIDDEN.includes(name);
        }
      });
  return removeDuplicates(routes, "path");
};
function removeDuplicates<T, K extends keyof T>(data: T[], key: K) {
  return data.filter(
      (value, index, array) => array.findIndex((item) => item[key] === value[key]) === index
  );
}
const existIdxf = computed(() => {
  return true;
});
</script>

<template>
  <div class="bh-header-main">
    <div class="d-flex justify-content-between">
      <div :class="{'bh-breadcrumb-container': Object.keys(dataPO).length > 0,}">
        <ol class="bh-breadcrumb">
          <li class="bh-breadcrumb__item">
            <router-link to="/" class="bh-breadcrumb__link">
              <i class="fa-regular fa-flag"></i>
              <span class="sr-only">home</span>
            </router-link>
          </li>
          <li v-for="{ path, name } in getRoutes()" :key="path" class="bh-breadcrumb__item">
            <router-link :to="path" class="bh-breadcrumb__link">
              {{ t(`router.${name as string}`) }}
            </router-link>
          </li>
        </ol>
      </div>
    </div>
  </div>
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
  //padding: 0rem 3rem;
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
    padding: 0rem 1rem;
    margin: 0;
    list-style: none;
    min-height: 2rem;
  max-height: 2rem;
    a {
      color: inherit;
      text-decoration: inherit;
      text-transform: capitalize;
    }
  }
}

.bh-breadcrumb {
  &__item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-right: 0.25rem;
    width: max-content;

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

.bh-breadcrumb > .bh-breadcrumb__item + .bh-breadcrumb__item:before {
  content: "\002F";
  padding: 2px 5px;
  color: #514747;
  font-size: 1.5rem;
  //font-family: "Glyphicons Halflings", sans-serif;
}
</style>