<script setup lang="ts">
import InputNumber from "primevue/inputnumber";
interface Emits {
  (e: "update:modelValue", value: unknown): void;
  (e: "change", value: void): void;
}

const emit = defineEmits<Emits>();
defineProps({
  id: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  value: { type: String, default: "" },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Number,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
  ok: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
});
const onUpdateModelValue = (value: string | undefined) => {
  emit("update:modelValue", value);
  emit("change");
};
</script>

<template>
  <div class="bh-field">
    <label :for="id" :class="[{ required: required }]"
      >{{ label }}
      <small v-if="required" class="p-error inputRequired"> *</small>
    </label>
    <div class="p-input-icon-right w100 cero">
      <i v-if="ok" class="fa fa-check-circle okClassInput" />
      <InputNumber
        id="code"
        :model-value="modelValue"
        :min="-1000000"
        :max="1000000"
        inputId="locale-german"
        locale="de-DE"
        mode="decimal"
        :disabled="disabled"
        :minFractionDigits="0"
        :maxFractionDigits="3"
        :required="required"
        :class="[{ 'w100 p-invalid': errorMessage }, { 'w100 i-required': required }]"
        @update:model-value="onUpdateModelValue" />
      <small v-if="errorMessage" :id="`${id}-help`" class="p-error-absolute">{{
        errorMessage
      }}</small>
    </div>
  </div>
</template>
<style scoped lang="scss">
.inputRequired {
  font-size: 13px !important;
}
.okClassInput {
  color: var(--success-color) !important;
}

::v-deep(.i-required .p-inputnumber-input) {
  background-color: rgba(255, 255, 0, 0.219);
}
::v-deep(.p-inputnumber) {
  width: 100%;
}
::v-deep(.p-inputnumber .p-inputnumber-input) {
  width: 100%;
}
.p-error-absolute {
  color: var(--error);
  position: absolute;
  bottom: -17px;
  left: 0;
}
</style>
