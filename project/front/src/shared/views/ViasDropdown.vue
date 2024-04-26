<script lang="ts" setup>
import BaseInput from "@/core/common/BaseInput.vue";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { viasInicial, type Vias } from "@/shared/dominio/Vias";
import { useFormBasic } from "@/shared/store/formBasicDatosStore";
//import Button from "primevue/button";
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
const vias = ref<Vias[]>();
const onEditVia = ref(false);

onMounted(async () => {
  if (formBasic.vias.length == 0) {
    vias.value = await formBasic.searchVias();
  } else {
    vias.value = formBasic.getVias();
  }
});

function editVia(view: boolean) {
  if (!disabled.value) {
    if (!view) {
      onUpdateModelValue(UtilHelper.clone(viasInicial));
    }
    onEditVia.value = view;
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
  <div v-show="onEditVia">
    <div class="d-flex">
      <div class="bh-field">
        <label v-if="showLabel" :class="[{ required: required }]" :for="id"
          >{{ label }} {{ modelValue }}</label
        >
        <Dropdown
          :id="id"
          :model-value="modelValue"
          :options="vias"
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
  <div v-show="!onEditVia">
    <BaseInput
      :modelValue="valueInput"
      :errorMessage="errorMessage"
      :required="required"
      :disabled="disabled"
      class="direct2"
      label="Via"
      @click="editVia(true)" />
  </div>
</template>
<style lang="scss" scoped></style>
<!-- <template>
  {{ modelValue }}
  <div v-show="onEditVia">
    <div class="d-flex">
      <BaseDropdown
        id=""
        :modelValue="modelValue"
        :options="vias"
        optionLabel="descricion"
        label="Via"
        :loading="false"
        placeholder="tipo via" />
      <div class="d-flex align-items-end">
        <Button class="p-button-danger" label="x" @click="editVia(false)" />
         <small v-if="modelTitular.idtipovia.error">&nbsp;</small>
      </div>
    </div>
  </div>
  <div v-show="!onEditVia">
    <BaseInput
      v-model="searchInViaInput.textValue"
      class="direct2"
      label="Via"
      :errorMessage="modelTitular.idtipovia.error"
      :required="modelTitular.idtipovia.req"
      @click="editVia(true)" />
  </div>
</template> -->
