<script setup lang="ts">
import Textarea from "primevue/textarea";

type Props = {
  id: string;
  errorMessage?: string;
  label: string;
  type?: string;
  modelValue: string;
  required?: boolean;
  disabled?: boolean;
};

interface Emits {
  (e: "update:modelValue", value: unknown): void;
}

const emit = defineEmits<Emits>();

const onUpdateModelValue = (value: string | undefined) => {
  emit("update:modelValue", value?.trim() ?? "");
};

withDefaults(defineProps<Props>(), {
  id: "",
  errorMessage: "",
  type: "text",
  disabled: false,
});
</script>

<template>
  <div class="bh-field">
    <label :for="id" :class="[{ required: required }]">{{ label }}</label>
    <Textarea
      :id="id"
      :disabled="disabled"
      :model-value="modelValue"
      :autoResize="true"
      rows="5"
      cols="30"
      :aria-describedby="`${id}-help`"
      :class="[{ 'p-invalid': errorMessage }]"
      @update:model-value="onUpdateModelValue" />
    <small v-if="errorMessage" :id="`${id}-help`" class="p-error">{{ errorMessage }}</small>
  </div>
</template>
