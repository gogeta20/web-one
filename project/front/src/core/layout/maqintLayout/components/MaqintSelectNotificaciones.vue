<script setup lang="ts">
import { onUnmounted, ref } from "vue";

const isOpenDropdown = ref(false);
const openDropdown = (event: Event) => {
  event.preventDefault();
  if (!isOpenDropdown.value) {
    isOpenDropdown.value = true;
  }
  event.stopPropagation();
};

const closeDropdown = () => {
  if (isOpenDropdown.value) isOpenDropdown.value = false;
};

window.addEventListener("click", closeDropdown);

onUnmounted(() => {
  window.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div
    id="dropdown"
    role="button"
    tabindex="0"
    class="bh-dropdown"
    :class="[{ 'bh-dropdown--open': isOpenDropdown }]"
    @click="openDropdown"
    @keydown="openDropdown">
    <slot />
    <section class="bh-dropdown__menu">
      <slot name="menu" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.bh-dropdown {
  display: flex;
  position: relative;
  user-select: none;
  touch-action: manipulation;
  cursor: pointer;

  &__menu {
    min-width: 200px;
    cursor: initial;
    font-size: 0.9em;
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: inherit;
    margin-top: 0.5rem;
    padding: 0.5rem 0.7rem;
    color: var(--text-color);
    text-shadow: 1px 1px #fff;
    border-radius: 2px;
    border: 1px solid #e8e8e8;
    box-shadow: 4px 4px 10px -3px rgba(50, 50, 50, 0.1);
    background-color: rgba(255, 255, 255, 0.97);
    z-index: 1000;
    right: 0;
  }

  &--open > {
    .bh-dropdown__menu {
      display: block;
    }
  }
}
</style>
