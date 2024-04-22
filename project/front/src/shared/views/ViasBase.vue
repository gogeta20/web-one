<script lang="ts" setup>
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { viasInicial, type Vias } from "@/shared/dominio/Vias";
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
  via: number;
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
  optionLabel: "descricion",
  via: 0,
});
const { disabled, via, modelValue } = toRefs(props);
const vias = ref<Vias[]>([UtilHelper.clone(viasInicial)]);
const loading = ref(false);

loading.value = true;
onMounted(async () => {
  let viasItems = [];
  if (formBasic.vias.length == 0) {
    viasItems = await formBasic.searchVias();
  } else {
    viasItems = formBasic.getVias();
  }
  vias.value.push(...viasItems);
  editSeletedValue();
  loading.value = false;
});

watch(via, editSeletedValue);

async function editSeletedValue() {
  if (isValidId(via.value.toString())) {
    loading.value = true;
    const respu = vias.value.find((item) => {
      return item.idtipovia == via.value;
    });
    emit("update:modelValue", respu);
    loading.value = false;
  }
}

function isValidId(id: string): boolean {
  return !isNaN(Number.parseInt(id));
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
  <div class="d-flex z-index100">
    <div class="bh-field">
      <label v-if="showLabel" :class="[{ required: required }]" :for="id"
        >{{ label }}
        <small v-if="required" class="p-error inputRequired"> *</small>
      </label>
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
        :class="[{ 'p-invalid': errorMessage }, { 'i-required': required }]"
        @change="onChange"
        @update:model-value="onUpdateModelValue" />
      <div class="container-error">
        <small v-if="errorMessage" :id="`${id}-help`" class="p-error error-position">{{
          errorMessage
        }}</small>
      </div>
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
