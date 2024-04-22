<script lang="ts" setup>
import BaseInput from "@/core/common/BaseInput.vue";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { concellosInicial, type Concellos } from "@/shared/dominio/Concellos";
import { useFormBasic } from "@/shared/store/formBasicDatosStore";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { onMounted, ref, toRefs, watch } from "vue";
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
  searchInProv: string;
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
  searchInProv: "",
});
const { modelValue, searchInProv, disabled } = toRefs(props);
const concellos = ref<Concellos[]>([UtilHelper.clone(concellosInicial)]);
const onEditConcellos = ref(false);
const loadingConcellos = ref(false);
watch(searchInProv, theGrantsResolve);
async function theGrantsResolve() {
  loadingConcellos.value = true;
  concellos.value = await formBasic.searchConcellos(searchInProv.value);
  loadingConcellos.value = false;
}
onMounted(async () => {
  if (formBasic.vias.length == 0) {
    concellos.value = await formBasic.searchConcellos("15");
  } else {
    concellos.value = formBasic.getConcellos();
  }
});

async function editConcellos(view: boolean) {
  if (!disabled.value) {
    if (!view) {
      onUpdateModelValue(UtilHelper.clone(concellosInicial));
    }
    onEditConcellos.value = view;
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
  <div v-show="onEditConcellos">
    <div class="d-flex">
      <div class="bh-field">
        <label v-if="showLabel" :class="[{ required: required }]" :for="id">{{ label }}</label>
        <Dropdown
          :id="id"
          :model-value="modelValue"
          :options="concellos"
          :optionLabel="optionLabel"
          :placeholder="placeholder"
          :loading="loadingConcellos"
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
        <Button class="p-button-danger" label="x" @click="editConcellos(false)" />
      </div>
    </div>
  </div>
  <div v-show="!onEditConcellos">
    <BaseInput
      :modelValue="viaInput"
      :errorMessage="errorMessage"
      :required="required"
      :disabled="disabled"
      class="direct2"
      label="Concello"
      @click="editConcellos(true)" />
  </div>
</template>
<style lang="scss" scoped></style>
