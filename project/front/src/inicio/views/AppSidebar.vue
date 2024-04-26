<template>
  <CSidebar
    class="border-end"
    colorScheme="dark"
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="(event) => usuarioStore.updateSidebarVisible('updateSidebarVisible', event)"
  >
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">
          <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32" />
          <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32" />
        </CSidebarBrand>
      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="usuarioStore.toggleSidebar('toggleSidebar')" />
    </CSidebarHeader>
    <AppSidebarNav />
<!--    <CSidebarFooter class="border-top d-none d-lg-flex">-->
<!--      <CSidebarToggler @click="usuarioStore.toggleSidebar('toggleUnfoldable')" />-->
<!--    </CSidebarFooter>-->
  </CSidebar>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useUsuarioStore } from "@/auth/store/usuarioStore";
// import { logo } from '@/assets/brand/logo'
// import { sygnet } from '@/assets/brand/sygnet'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler
} from "@coreui/vue/dist/esm/components/sidebar";
import {CCloseButton} from "@coreui/vue/dist/esm/components/close-button";
import {AppSidebarNav} from "./AppSidebarNav";
import CIcon from "@coreui/icons-vue";

const usuarioStore = useUsuarioStore();

const sidebarUnfoldable = computed(() => usuarioStore.sidebarUnfoldable)
const sidebarVisible = computed(() => usuarioStore.sidebarVisible)

// const components = {
//   AppSidebarNav: () => import('./AppSidebarNav'),
//   RouterLink: () => import('vue-router'),
// }
</script>