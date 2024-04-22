<script setup lang="ts">
import InputText from "primevue/inputtext";
import { onMounted, ref, toRefs, watch } from "vue";
interface Emits {
  (e: "update:modelValue", value: unknown): void;
  (e: "change", value: void): void;
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
    default: "text",
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
  showTitle: {
    type: Boolean,
    default: true,
  },
  min: {
    type: Number,
    default: -1000000,
  },
  max: {
    type: Number,
    default: 1000000,
  },
  showTooltip: {
    type: Boolean,
    default: true,
  },
});

const onUpdateModelValue = (value: string | undefined) => {
  emit("update:modelValue", value);
  emit("change");
};

const tooltipAutomatico = ref(false);
function calculoWith() {
  const inputTextBase = document.getElementById("inputTextBaseX");
  if (inputTextBase) {
    const inputtext: any = inputTextBase.getElementsByClassName("p-inputtext");
    if (
      inputtext[0].scrollWidth &&
      inputtext[0].offsetWidth &&
      inputtext[0].scrollWidth > inputtext[0].offsetWidth
    ) {
      tooltipAutomatico.value = true;
    }
  }
}

onMounted(() => {
  calculoWith();
});
</script>

<template>
  <div class="bh-field w100 cero">
    <label v-if="showTitle" :for="id" :class="[{ required: required }]"
      >{{ label }}
      <small v-if="required" class="p-error inputRequired"> *</small>
    </label>
    <div class="p-input-icon-right w100 cero inputDiv" id="inputTextBaseX">
      <div v-if="showTooltip || tooltipAutomatico" class="tooltiptext">
        {{ modelValue }}
      </div>
      <i v-if="ok" class="fa fa-check-circle okClassInput" />
      <InputText
        :id="id"
        :disabled="disabled"
        :model-value="modelValue"
        :type="type"
        :min="min"
        :max="max"
        :aria-describedby="`${id}-help`"
        :placeholder="placeholder"
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
.p-error-absolute {
  color: var(--error);
  position: absolute;
  bottom: -17px;
  left: 0;
}
.inputDiv {
  display: inline-block;
  flex: 1;
  padding: 0.5rem 0.5rem;

  .tooltiptext {
    visibility: hidden;
    background-color: #e8f1fe;
    color: #084298;
    text-align: start;
    border-radius: 6px;
    position: absolute;
    z-index: 10;
    opacity: 0;
    transition: opacity 1s;
    border: solid 1px #a6c5f1;
    left: 0.5rem;
    top: 2rem;
    padding: 0.5rem 0.5rem;
    width: 99%;
  }

  &:hover {
    cursor: none;

    .tooltiptext {
      visibility: visible;
      opacity: 1;
    }
  }
}

.wizard-title-estado {
  padding: 0.5rem 0.5rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
::v-deep(.i-required) {
  background-color: var(--color-required);
}
</style>
