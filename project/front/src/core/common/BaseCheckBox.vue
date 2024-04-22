<script setup lang="ts">
import Checkbox from "primevue/checkbox";

type Props = {
  id: string;
  errorMessage?: string;
  label: string;
  type?: string;
  modelValue: string | number | boolean;
  binary?: boolean;
  required?: boolean;
};

interface Emits {
  (e: "update:modelValue", value: unknown): void;
}

const emit = defineEmits<Emits>();

const onUpdateModelValue = (value: string | number | boolean) => {
  emit("update:modelValue", value);
};

withDefaults(defineProps<Props>(), {
  id: "",
  errorMessage: "",
  type: "text",
  binary: false,
});
const labelSelect = "label-selected";
</script>

<template>
  <div class="bh-field">
    <div class="bh-field-checkbox">
      <Checkbox
        :inputId="id"
        :model-value="modelValue"
        :aria-describedby="`${id}-help`"
        :class="[{ 'p-invalid': errorMessage }]"
        :binary="binary"
        @update:model-value="onUpdateModelValue" />
      <label :for="id" :class="[{ required: required, 'label-selected': labelSelect }]">{{
        label
      }}</label>
    </div>
    <small v-if="errorMessage" :id="`${id}-help`" class="p-error">{{ errorMessage }}</small>
  </div>
</template>

<style lang="scss" scoped>
.bh-field-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
