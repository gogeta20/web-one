<script lang="ts" setup>
import { titularidadInicial, type TitularidadMonte } from "@/shared/dominio/TitularidadMonte";
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
   po?: string;
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
  optionLabel: "title",
  po: "po",
});
const { disabled, po } = toRefs(props);
const titularidad = ref<TitularidadMonte[]>([titularidadInicial]);
const loading = ref(false);

onMounted(async () => {
  try {
    loading.value = true;

    if (formBasic.titularidadMonte.length === 0) {
      titularidad.value = await formBasic.searchTitularidadMonte();
    } else {
      titularidad.value = formBasic.getTituliridadMonte();
    }

    if (po.value !== "po") {
      const codes = [13, 51, 12, 11];
      titularidad.value = titularidad.value.filter((item) => codes.includes(item.code));
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

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
    <label v-if="showLabel" :class="[{ required: required }]" :for="id">{{ label }}</label>
    <Dropdown
      :id="id"
      :model-value="modelValue"
      :options="titularidad"
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
</template>
<style lang="scss" scoped></style>
