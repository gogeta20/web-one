<script lang="ts" setup>
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { concellosInicial, type Concellos } from "@/shared/dominio/Concellos";
import { useFormBasic } from "@/shared/store/formBasicDatosStore";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, toRefs, watch } from "vue";
const formBasic = useFormBasic();
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
  provincia: number;
  concello: number | string;
};
const emit = defineEmits(["update:modelValue", "change"]);

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
  concello: 0,
  optionLabel: "concello",
});
const { disabled, concello, provincia } = toRefs(props);
const concellos = ref<Concellos[]>([UtilHelper.clone(concellosInicial)]);
const loading = ref(false);

onMounted(async () => {
  const prov = verifyId(provincia.value.toString());
  loading.value = true;
  let concellosItems = [];
  if (formBasic.concellos.length == 0) {
    concellosItems = await formBasic.searchConcellos(prov.toString());
  } else {
    concellosItems = formBasic.getConcellos();
  }
  concellos.value.push(...concellosItems);
  editSeletedValue();
  loading.value = false;
});

watch(provincia, editValues);

async function editValues() {
  if (isValidId(provincia.value.toString())) {
    loading.value = true;
    concellos.value = [UtilHelper.clone(concellosInicial)];
    if (provincia.value !== 0) {
      const concellosItems = await formBasic.searchConcellos(provincia.value.toString());
      concellos.value.push(...concellosItems);
    }
    editSeletedValue();
    loading.value = false;
  }
}

async function editSeletedValue() {
  loading.value = true;
  const respu = concellos.value.find((item) => {
    return item.value == concello.value;
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
      :options="concellos"
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
::v-deep(.i-required) {
  background-color: var(--color-required);
}

.inputRequired {
  font-size: 13px !important;
}
</style>
