<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  withMin: {
    type: String,
    default: "3",
  },
});
const { withMin } = toRefs(props);
const ancho = withMin.value + "rem";
</script>
<template>
  <div v-show="visible" class="list-loading">
    <i class="pi pi-spin pi-spinner ancho" />
  </div>
</template>
<style lang="scss" scoped>
.list-loading {
  text-align: center;
  padding: 20px;
  color: var(--light-blue);
}
.ancho {
  font-size: v-bind(ancho);
}
</style>
