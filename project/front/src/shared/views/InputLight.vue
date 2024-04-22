<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputLight",

  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    additionalClass: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    required: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 0,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    function onChanged(e) {
      emit("update:modelValue", e.currentTarget.value);
    }

    return {
      onChanged,
    };
  },
});
</script>
<template>
  <div class="bh-field w100 cero">
    <label :for="id" :class="[{ required: required }]"
      >{{ label }}
      <small v-if="required" class="p-error inputRequired"> *</small>
    </label>
    <div class="p-input-icon-right w100 cero">
      <i v-if="ok" class="fa fa-check-circle okClassInput" />
      <input
        :id="id"
        :class="[
          { 'p-invalid': errorMessage, 'p-inputtext p-component p-inputnumber-input': true },
        ]"
        :disabled="disabled"
        :type="type"
        :value="modelValue"
        :min="min"
        :max="max"
        :placeholder="placeholder"
        :aria-describedby="`${id}-help`"
        step="any"
        @input="onChanged" />
      <small v-if="errorMessage" :id="`${id}-help`" class="p-error-absolute">{{
        errorMessage
      }}</small>
    </div>
  </div>
</template>

<style scoped lang="scss">
// pendiente
// medio stacion logica de idEstacion
// separacion de resumen en partes mas pequeñas
// creacion de nueva maqueta para las pestañas siguientes
// login pantalla /dev ocultar
// estructura del vite config
// consulta backend con cache
// refactorizacion de avisos

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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>
