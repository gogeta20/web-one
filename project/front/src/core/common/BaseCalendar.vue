<!--<script setup lang="ts">-->
<!--import Calendar from "primevue/calendar";-->
<!--interface Emits {-->
<!--  (e: "update:modelValue", value: unknown): void;-->
<!--}-->

<!--const emit = defineEmits<Emits>();-->
<!--defineProps({-->
<!--  id: {-->
<!--    type: String,-->
<!--    default: "",-->
<!--  },-->
<!--  errorMessage: {-->
<!--    type: String,-->
<!--    default: "",-->
<!--  },-->
<!--  dateFormat: {-->
<!--    type: String,-->
<!--    default: "dd/mm/yy",-->
<!--  },-->
<!--  value: { type: Date, default: undefined, required: false },-->
<!--  disabled: {-->
<!--    type: Boolean,-->
<!--    default: false,-->
<!--  },-->
<!--  label: {-->
<!--    type: String,-->
<!--    default: "",-->
<!--  },-->
<!--  modelValue: { type: Date, default: undefined, required: false },-->
<!--  required: {-->
<!--    type: Boolean,-->
<!--    default: false,-->
<!--  },-->
<!--  ok: {-->
<!--    type: Boolean,-->
<!--    default: false,-->
<!--  },-->
<!--  showIcon: {-->
<!--    type: Boolean,-->
<!--    default: false,-->
<!--  },-->
<!--});-->

<!--const onUpdateModelValue = (value: Date | undefined) => {-->
<!--  emit("update:modelValue", value);-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div class="bh-field w100 cero">-->
<!--    <label :for="id" :class="[{ required: required }]"-->
<!--      >{{ label }}-->
<!--      <small v-if="required" class="p-error inputRequired"> *</small>-->
<!--    </label>-->
<!--    <div class="p-input-icon-right w100 cero">-->
<!--      <i v-if="ok" class="fa fa-check-circle okClassInput" />-->
<!--      <Calendar-->
<!--        :id="id"-->
<!--        :disabled="disabled"-->
<!--        :model-value="-->
<!--          modelValue === undefined || typeof modelValue.getMonth === 'function'-->
<!--            ? modelValue-->
<!--            : undefined-->
<!--        "-->
<!--        :aria-describedby="`${id}-help`"-->
<!--        :showIcon="showIcon"-->
<!--        :dateFormat="dateFormat"-->
<!--        :class="[{ 'w100 p-invalid': errorMessage }, { 'w100 i-required': required }]"-->
<!--        @update:model-value="onUpdateModelValue" />-->
<!--      <small v-if="errorMessage" :id="`${id}-help`" class="p-error-absolute">{{-->
<!--        errorMessage-->
<!--      }}</small>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.inputRequired {-->
<!--  font-size: 13px !important;-->
<!--}-->
<!--.okClassInput {-->
<!--  color: var(&#45;&#45;success-color) !important;-->
<!--}-->
<!--.p-error-absolute {-->
<!--  color: var(&#45;&#45;error);-->
<!--  position: absolute;-->
<!--  bottom: -17px;-->
<!--  left: 0;-->
<!--}-->
<!--input::-webkit-outer-spin-button,-->
<!--input::-webkit-inner-spin-button {-->
<!--  -webkit-appearance: none;-->
<!--  margin: 0;-->
<!--}-->
<!--::v-deep(.i-required) {-->
<!--  background-color: var(&#45;&#45;color-required);-->
<!--}-->

<!--::v-deep(.i-required input) {-->
<!--  background-color: var(&#45;&#45;color-required);-->
<!--}-->
<!--</style>-->
