<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { ref, toRefs, watch } from "vue";
import { getDniValido } from "@/shared/infrastructure/useCases/GetDniValido";
interface Emits {
  (e: "update:modelValue", value: unknown): void;
  (e: "update:isValid", value: unknown): void;
}

const emit = defineEmits<Emits>();
const props = defineProps({
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
    type: String,
    default: "",
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
  isValid: {
    type: Boolean,
    default: false,
  },
});
const { modelValue } = toRefs(props);
const viewCheck = ref(false);
const viewError = ref("");
const loading = ref(false);
watch(modelValue, verificacionNif);
async function verificacionNif() {
  let valid = false;
  viewError.value = "";
  viewCheck.value = false;
  if (modelValue.value.length == 9) {
    loading.value = true;
    const valido = await getDniValido(modelValue.value);
    if (valido.dni) {
      viewCheck.value = true;
      viewError.value = "";
      valid = true;
    } else {
      viewCheck.value = false;
      viewError.value = "No válido";
      valid = false;
    }
    loading.value = false;
  }
  emit("update:isValid", valid);
}

const onUpdateModelValue = (value: string | undefined) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="bh-field w100 cero">
    <label :for="id" :class="[{ required: required }]"
      >{{ label }}
      <small v-if="required" class="p-error inputRequired"> *</small>
    </label>
    <div class="p-input-icon-right w100 cero">
      <i v-if="!viewCheck && !loading" class="" />
      <i v-else-if="loading" class="pi pi-spin pi-spinner" />
      <i v-else-if="viewCheck" class="fa fa-check-circle okClassInput" />
      <InputText
        :id="id"
        :disabled="loading"
        :model-value="modelValue.toUpperCase()"
        :type="type"
        :aria-describedby="`${id}-help`"
        :placeholder="placeholder"
        :class="[{ 'p-invalid': viewError }]"
        @update:model-value="onUpdateModelValue" />
      <small v-if="viewError" :id="`${id}-help`" class="p-error-absolute">{{ viewError }}</small>
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
.p-error-absolute {
  color: var(--error);
  position: absolute;
  bottom: -17px;
  left: 0;
}
</style>
