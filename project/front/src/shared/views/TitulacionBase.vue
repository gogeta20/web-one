<script lang="ts" setup>
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { titulacionInicial, type Titulacion } from "@/shared/dominio/Titulacion";
import { useFormBasic } from "@/shared/store/formBasicDatosStore";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, toRefs } from "vue";
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
  titulacion: number;
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
  titulacion: 0,
  optionLabel: "descricionGl",
});
const { disabled, titulacion } = toRefs(props);
const titulacions = ref<Titulacion[]>([UtilHelper.clone(titulacionInicial)]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  let titulacionItems = [];
  if (formBasic.titulacion.length == 0) {
    titulacionItems = await formBasic.searchTitulaciones();
  } else {
    titulacionItems = formBasic.getTitulaciones();
  }
  titulacions.value.push(...titulacionItems);
  editSeletedValue();
  loading.value = false;
});

async function editSeletedValue() {
  loading.value = true;
  const respu = titulacions.value.find((item) => {
    return item.idTitulacion == titulacion.value;
  });
  emit("update:modelValue", respu);
  loading.value = false;
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
  <div class="bh-field">
    <label v-if="showLabel" :class="[{ required: required }]" :for="id"
      >{{ label }}
      <small v-if="required" class="p-error inputRequired"> *</small>
    </label>
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
