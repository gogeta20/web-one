<script setup lang="ts">
import CKEditorView from "@/core/common/BaseCKEditor.vue";
import BaseInput from "@/core/common/BaseInput.vue";
import { UtilForms } from "@/core/utilities/UtilForms";
import { useAyudaStore } from "@/shared/store/ayudaStore";
import { bicons as bc } from "@/shared/views/Buttons/ButtonsVariables";
//import Button from "primevue/button";
//import Button from "primevue/dialog";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { ToastSeverity } from "primevue/api";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const ayudaStore = useAyudaStore();
const editorValueSugerencia = ref({ textValue: "" });
const editorValueSugerenciaFormat = ref({ textValue: "" });
const email = ref<string>("");
const emailVerified = ref<boolean>(false);
const emailError = ref<string>("");
const isError = ref<boolean>(false);
const suxerenciaError = ref<string>("");
const exteriorExpand = ref({
  expand: false,
});
const { t } = useI18n();
const loadingGardar = ref(false);
watch(email, verifyEmail);

function hideError() {
  isError.value = false;
}

function verifyForm() {
  isError.value = false;
  emailError.value = "";
  suxerenciaError.value = "";

  if (
    email.value !== "" &&
    editorValueSugerenciaFormat.value.textValue !== "" &&
    UtilForms.validateEmail(email.value) !== null
  ) {
    isError.value = false;
  } else {
    isError.value = true;
    if (email.value === "") {
      emailError.value = "axuda.errors.email-vacio";
    } else if (UtilForms.validateEmail(email.value) === null) {
      emailError.value = "axuda.errors.email-invalido";
    }

    if (suxerenciaError.value === "") {
      suxerenciaError.value = "axuda.errors.suxerencia-vacio";
    }
  }
  return !isError.value;
}

function verifyEmail() {
  if (email.value !== "" && UtilForms.validateEmail(email.value) !== null) {
    emailVerified.value = true;
  } else {
    emailVerified.value = false;
  }
}

async function postEmailSuxerencia() {
  if (verifyForm()) {
    loadingGardar.value = true;
    ayudaStore
      .postEmailSuxerencia(editorValueSugerenciaFormat.value.textValue, email.value)
      .then(() => {
        loadingGardar.value = false;
        closeFormAyudaSugerencia();
        toast.add({
          severity: ToastSeverity.SUCCESS,
          detail: t("succes"),
          closable: true,
          life: 3000,
        });
      })
      .catch(() => {
        loadingGardar.value = false;
      });
  }
}

function closeFormAyudaSugerencia() {
  ayudaStore.showFormAyudaSugerencia = false;
}

function formatErrorEmail() {
  if (emailError.value !== "") {
    return t(emailError.value);
  } else {
    return "";
  }
}
</script>

<template>
  <Dialog
    :visible="true"
    :header="t('axuda.header-enviar-suxerencia')"
    :style="exteriorExpand.expand ? { width: '80vw', height: '500vw' } : { width: '50vw' }"
    :maximizable="false"
    :modal="true"
    @update:visible="closeFormAyudaSugerencia">
    <div class="main-dialog-container">
      <div v-show="isError" class="alert alert-danger mt-3" role="alert">
        <div class="d-flex justify-content-between">
          <div v-if="emailError !== ''">{{ t(emailError) }}</div>
          <div v-if="suxerenciaError !== ''">{{ t(suxerenciaError) }}</div>
          <Button
            :icon="bc.iconClose"
            class="p-button-rounded p-button-danger p-button-text"
            @click="hideError" />
        </div>
      </div>
      <div class="row">
        <div class="col-5">
          <BaseInput
            id="email"
            v-model="email"
            :label="t('axuda.campos.mail')"
            :required="true"
            :disabled="false"
            :errorMessage="formatErrorEmail()"
            :placeholder="t('axuda.campos.mail')"
            :ok="emailVerified" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <label class="strong">{{ t("axuda.header-ckeditor-suxerencia") }}</label>
          <CKEditorView
            :editorValue="editorValueSugerencia"
            :editorValueFormat="editorValueSugerenciaFormat"
            :disabled="false"
            :required="true"
            :exteriorExpand="exteriorExpand" />
        </div>
      </div>
    </div>
    <template #footer>
      <div class="main-footer">
        <Button
          :label="t('core.buttons.save')"
          :loading="loadingGardar"
          icon="pi pi-check"
          @click="postEmailSuxerencia" />
      </div>
    </template>
  </Dialog>
</template>
