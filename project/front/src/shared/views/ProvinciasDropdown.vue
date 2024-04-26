<script lang="ts" setup>
import { useFormBasic } from "@/shared/store/formBasicDatosStore"
import BaseInput from "@/core/common/BaseInput.vue";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { provinciasInicial, type Provincias } from "@/shared/dominio/Provincias";
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
  viaInput: string;
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
  viaInput: "",
});
const { modelValue, disabled } = toRefs(props);
const provinces = ref<Provincias[]>([UtilHelper.clone(provinciasInicial)]);
const onEditProvincia = ref(false);

onMounted(async () => {
  if (formBasic.vias.length == 0) {
    provinces.value = await formBasic.searchProvincias("0");
  } else {
    provinces.value = formBasic.getProvincias();
  }
});

async function editProvincia(view: boolean) {
  if (!disabled.value) {
    if (!view) {
      onUpdateModelValue(UtilHelper.clone(provinciasInicial));
    }
    onEditProvincia.value = view;
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
  <div v-show="onEditProvincia">
    <div class="d-flex">
      <div class="bh-field">
        <label v-if="showLabel" :class="[{ required: required }]" :for="id">{{ label }}</label>
        <Dropdown
          :id="id"
          :model-value="modelValue"
          :options="provinces"
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
        <Button class="p-button-danger" label="x" @click="editProvincia(false)" />
      </div>
    </div>
  </div>
  <div v-show="!onEditProvincia">
    <BaseInput
      :modelValue="viaInput"
      :errorMessage="errorMessage"
      :required="required"
      :disabled="disabled"
      class="direct2"
      label="Provincia"
      @click="editProvincia(true)" />
  </div>
</template>
<style lang="scss" scoped></style>
<!-- <div class="">
    <div v-show="onEditProvincia">
      <div class="d-flex">
        <BaseDropdown
          id=""
          v-model="searchInProvince"
          :options="provinces"
          optionLabel="province"
          label="Provincia"
          :errorMessage="modelTitular.codprovincia.error"
          :required="modelTitular.codprovincia.req"
          :loading="provincesLoading"
          :placeholder="t('alta-solicitude.provincia')" />
        <div class="d-flex align-items-end">
          <Button class="p-button-danger" label="x" @click="editProvincia(false)" />
          <small v-if="modelTitular.codprovincia.error">&nbsp;</small>
        </div>
      </div>
    </div>
    <div v-show="!onEditProvincia">
      <BaseInput
        v-model="searchInProvinceInput"
        class="direct2"
        label="Provincia"
        :errorMessage="modelTitular.codprovincia.error"
        :required="modelTitular.codprovincia.req"
        @click="editProvincia(true)" />
    </div>
  </div> -->
