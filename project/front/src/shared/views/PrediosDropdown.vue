<script lang="ts" setup>
import type { MonteItem } from "@/altaSolicitude/dominio/resumen/MontesDelInstrumento.js";
import { monteItemInicial } from "@/altaSolicitude/dominio/resumen/MontesDelInstrumento.js";
import { useDatosXerais } from "@/altaSolicitude/store/DatosXeraisStore";
import Dropdown from "primevue/dropdown";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const datosXerais = useDatosXerais();
const { t } = useI18n();
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
};

withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: "",
  errorMessage: "",
  showClear: false,
  disabled: false,
  loading: false,
  showLabel: true,
  required: false,
  optionLabel: "nomePredio",
});
const prediosStore = ref<MonteItem[]>([]);
prediosStore.value = datosXerais.getPredios();
const prediosStoreSelected = ref<MonteItem>(monteItemInicial);

onMounted(async () => {
  prediosStoreSelected.value = datosXerais.getPredioSelected();
  emit("update:modelValue", prediosStoreSelected.value);
});

const loadingPredios = computed(() => {
  return datosXerais.dx.loadingPredios;
});

const predios = computed(() => {
  return datosXerais.dx.predios;
});

const onUpdateModelValue = (value: unknown) => {
  emit("update:modelValue", value);
};
const onChange = (event: { originalEvent: unknown; value: unknown }) => {
  emit("change", event.value);
};
</script>
<template>
  <div :class="[{ none: predios.length == 1 }]">
    <div class="bh-field d-flex">
      <label class="strong labelPredios" for="predios">{{
        t("alta-solicitude.monte.monte")
      }}</label>
      <Dropdown
        :id="id"
        :model-value="modelValue"
        :options="predios"
        :optionLabel="optionLabel"
        :placeholder="placeholder"
        :loading="loadingPredios"
        :showClear="showClear"
        :disabled="disabled"
        :aria-describedby="`${id}-help`"
        :class="[{ 'p-invalid': errorMessage }]"
        @change="onChange"
        @update:model-value="onUpdateModelValue" />
      <small v-if="errorMessage" :id="`${id}-help`" class="p-error">{{ errorMessage }}</small>
    </div>
  </div>
</template>
