<script lang="ts" setup>
import { useFormBasic } from "@/shared/store/formBasicDatosStore";
import BaseInput from "@/core/common/BaseInput.vue";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { titulacionInicial, type Titulacion } from "@/shared/dominio/Titulacion";
import { viasInicial } from "@/shared/dominio/Vias";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, toRefs } from "vue";
const formBasic = useFormBasic();
type Props = {
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
  show?: boolean;
  valueInput: string;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: "",
  errorMessage: "",
  showClear: false,
  disabled: false,
  loading: false,
  showLabel: true,
  required: false,
  valueInput: "",
});
const { modelValue, required, disabled } = toRefs(props);
const titulacions = ref<Titulacion[]>([UtilHelper.clone(titulacionInicial)]);
const onEditTitulacion = ref(false);
onMounted(async () => {
  if (formBasic.titulacion.length == 0) {
    titulacions.value = await formBasic.searchTitulaciones();
  } else {
    titulacions.value = formBasic.getTitulaciones();
  }
});

function editVia(view: boolean) {
  if (!disabled.value) {
    if (!view) {
      onUpdateModelValue(UtilHelper.clone(viasInicial));
    }
    onEditTitulacion.value = view;
  }
}

const emit = defineEmits(["update:modelValue", "change"]);

const onUpdateModelValue = (value: unknown) => {
  emit("update:modelValue", value);
};
const onChange = (event: { originalEvent: unknown; value: unknown }) => {
  emit("change", event.value);
};
</script>
<template>
  <div v-show="onEditTitulacion">
    <div class="d-flex">
      <div class="bh-field">
        <label v-if="showLabel" :class="[{ required: required }]" :for="id">{{ label }}</label>
        <Dropdown
          :id="id"
          :model-value="modelValue"
          :options="titulacions"
          :optionLabel="optionLabel"
          :placeholder="placeholder"
          :loading="loading"
          :showClear="showClear"
          :disabled="disabled"
          :aria-describedby="`${id}-help`"
          :class="[{ 'p-invalid': errorMessage }]"
          @change="onChange"
          @update:model-value="onUpdateModelValue" />
        <div class="container-error">
          <small v-if="errorMessage" :id="`${id}-help`" class="p-error error-position">{{
            errorMessage
          }}</small>
        </div>
      </div>
      <div class="d-flex align-items-end">
        <Button class="p-button-danger" label="x" @click="editVia(false)" />
      </div>
    </div>
  </div>
  <div v-show="!onEditTitulacion">
    <BaseInput
      :modelValue="valueInput"
      :errorMessage="errorMessage"
      :required="required"
      :disabled="disabled"
      class="direct2"
      label="Titulación"
      @click="editVia(true)" />
  </div>
</template>
<style lang="scss" scoped></style>
<!-- <template>
   <div class="">
          <div v-show="onEditTitulacion">
            <div class="d-flex">
              <BaseDropdown
                id=""
                v-model="searchInTitulacion"
                :options="titulacions"
                optionLabel="descricionGl"
                label="Titulación"
                :errorMessage="grantsSelect.idtitulacion.error"
                :required="grantsSelect.idtitulacion.req"
                :loading="false"
                placeholder="titulación" />
              <div class="d-flex align-items-end">
                <Button class="p-button-danger" label="x" @click="editTitulacion(false)" />
                <small v-if="grantsSelect.idtitulacion.error">&nbsp;</small>
              </div>
            </div>
          </div>
          <div v-show="!onEditTitulacion">
            <BaseInput
              v-model="searchInTitulacionInput"
              class="direct2"
              label="Titulación"
              :errorMessage="grantsSelect.idtitulacion.error"
              :required="grantsSelect.idtitulacion.req"
              @click="editTitulacion(true)" />
          </div>
        </div>
  </div>
</template> -->
