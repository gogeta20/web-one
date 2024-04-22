<script lang="ts" setup>
defineProps({
  nombreApp: {
    type: String,
    default: "",
  },
  versionApp: {
    type: String,
    default: "",
  },
  environment: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <aside v-if="['dev', 'stg', 'local', 'preview'].includes(environment)" class="bh-environment">
    <i class="fa fa-cogs" aria-hidden="true" />
    <span>{{ nombreApp }} {{ environment }} </span>
    <!-- <span>{{ nombreApp }} {{ environment }} {{ versionApp }}</span> -->
  </aside>
</template>

<style lang="scss" scoped>
.bh-environment {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  color: #fff;
  height: var(--header-height-min);
  background-color: #a00;
  text-shadow: -1px -1px #700;
  border-color: #700;
  text-transform: uppercase;
  position: sticky;
  // height: 37px;
  span {
    text-transform: uppercase;
  }
}
</style>
