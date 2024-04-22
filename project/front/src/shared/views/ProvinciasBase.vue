<script lang="ts" setup>
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { provinciasInicial, type Provincias } from "@/shared/dominio/Provincias";
import { useFormBasic } from "@/shared/store/formBasicDatosStore";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, toRefs, watch } from "vue";
const formBasic = useFormBasic();
const emit = defineEmits(["update:modelValue", "change"]);
type Props = {
  optionLabel?: string;
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
  provincia: number | string;
  comunidadAutonoma: number;
  gl?: boolean;
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
  provincia: 0,
  comunidadAutonoma: 0,
  optionLabel: "province",
  gl: false,
});
const { disabled, provincia, comunidadAutonoma, gl } = toRefs(props);
const provinces = ref<Provincias[]>([UtilHelper.clone(provinciasInicial)]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  if (gl.value) {
    let provinciasItems = [];
    provinciasItems = await formBasic.searchGalicia();
    formBasic.setComunidadAutonoma("12");
    provinces.value.push(...provinciasItems);
    editSeletedValue();
  } else {
    const ca = verifyId(comunidadAutonoma.value.toString());
    let provinciasItems = [];
    if (formBasic.comunidadAutonoma !== ca.toString()) {
      provinciasItems = await formBasic.searchProvincias(ca.toString());
      formBasic.setComunidadAutonoma(ca.toString());
    } else {
      provinciasItems = formBasic.getProvincias();
    }
    provinces.value.push(...provinciasItems);
    editSeletedValue();
  }
  loading.value = false;
});

watch(comunidadAutonoma, editValues);
watch(provincia, editSeletedValue);

async function editValues() {
  if (isValidId(comunidadAutonoma.value.toString())) {
    loading.value = true;
    provinces.value = await formBasic.searchProvincias(comunidadAutonoma.value.toString());
    editSeletedValue();
    loading.value = false;
  }
}

async function editSeletedValue() {
  loading.value = true;
  const p = Number.parseInt(provincia.value.toString());
  const respu = provinces.value.find((item) => {
    return item.value == p;
  });
  onUpdateModelValue(respu);
  loading.value = false;
}

function verifyId(id: string): number {
  return isNaN(Number.parseInt(id)) ? 0 : Number.parseInt(id);
}

function isValidId(id: string): boolean {
  return !isNaN(Number.parseInt(id));
}

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
      :options="provinces"
      :optionLabel="optionLabel"
      :placeholder="placeholder"
      :loading="loading"
      :showClear="showClear"
      :disabled="disabled"
      :aria-describedby="`${id}-help`"
      :class="[{ 'p-invalid': errorMessage }, { 'i-required': required }]"
      @change="onChange"
      @update:model-value="onUpdateModelValue" />
    <div class="container-error">
      <small v-if="errorMessage" :id="`${id}-help`" class="p-error error-position">{{
        errorMessage
      }}</small>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.z-index100 {
  z-index: 100;
}
::v-deep(.i-required) {
  background-color: var(--color-required);
}

.inputRequired {
  font-size: 13px !important;
}
</style>
