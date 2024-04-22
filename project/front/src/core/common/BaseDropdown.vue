<script setup lang="ts">
import Dropdown from "primevue/dropdown";

type Props = {
  options: unknown[];
  optionLabel: string;
  placeholder: string;
  id: string;
  loading?: boolean;
  showClear?: boolean;
  modelValue?: object | null;
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  required?: boolean;
  showLabel?: boolean;
  optionValue?: string;
};

withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: "",
  errorMessage: "",
  showClear: false,
  disabled: false,
  loading: false,
  showLabel: true,
  required: false,
  optionValue: "",
});

const emit = defineEmits(["update:modelValue", "change"]);

const onUpdateModelValue = (value: unknown) => {
  emit("update:modelValue", value);
};
const onChange = (event: { originalEvent: unknown; value: unknown }) => {
  emit("change", event.value);
};
</script>

<template>
  <div class="bh-field">
    <label v-if="showLabel" :class="[{ required: required }]" :for="id"
      >{{ label }}
      <small v-if="required" class="p-error inputRequired"> *</small>
    </label>
    <Dropdown
      :id="id"
      :model-value="modelValue"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :placeholder="placeholder"
      :loading="loading"
      :showClear="showClear"
      :disabled="disabled"
      :aria-describedby="`${id}-help`"
      :class="[{ w100: true }, { 'p-invalid': errorMessage }, { 'i-required': required }]"
      @change="onChange"
      @update:model-value="onUpdateModelValue" />
    <small v-if="errorMessage" :id="`${id}-help`" class="p-error-absolute">{{
      errorMessage
    }}</small>
  </div>
</template>
<style lang="scss" scoped>
.bh-field {
  width: 100%;
}
// .p-dropdown-label
::v-deep(.i-required) {
  background-color: rgba(255, 255, 0, 0.219);
}
.p-error-absolute {
  color: var(--error);
  position: absolute;
  bottom: -17px;
  left: 0;
}

.inputRequired {
  font-size: 13px !important;
}
</style>
