<script setup lang="ts">
import { getDescargarArchivoByRuta } from "@/altaSolicitude/infrastructure/useCases/files/getDescargarArchivoByRuta";
import { useAyudaStore } from "@/shared/store/ayudaStore";
import ListadoValidacionsCarga from "@/shared/views/Ayuda/ListadoValidacionsCarga.vue";
import { saveAs } from "file-saver";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const ayudaStore = useAyudaStore();
const { t } = useI18n();
const loadingValidacionsCarga = computed(() => {
  return ayudaStore.loadingValidacionsCarga;
});
const loadingArquivosSeccionsAll = computed(() => {
  return ayudaStore.loadingArquivosSeccionsAll;
});
const arquivoValidacion = computed(() => {
  return ayudaStore.arquivoValidacion;
});
const rutaSubseccionArquivoValidacion = computed(() => {
  return ayudaStore.rutaSubseccionArquivoValidacion;
});

function descargaArquivo() {
  arquivoValidacion.value.loadingDescarga = true;
  const rutaArquivo =
    arquivoValidacion.value.seccion.ruta +
    rutaSubseccionArquivoValidacion.value +
    arquivoValidacion.value.ruta;
  getDescargarArchivoByRuta(rutaArquivo, arquivoValidacion.value.ruta)
    .then((response) => {
      saveAs(response, arquivoValidacion.value.ruta);
      arquivoValidacion.value.loadingDescarga = false;
    })
    .catch(() => {
      arquivoValidacion.value.loadingDescarga = false;
    });
}
</script>

<template>
  <div>
    <div class="flota-derecha">
      {{ arquivoValidacion.descricion }}
      <a class="sub-apartado-arquivo">
        <div v-if="!arquivoValidacion.loadingDescarga && !loadingArquivosSeccionsAll">
          <span
            v-if="arquivoValidacion.existeArquivo"
            v-tooltip.left="t('core.buttons.download')"
            :class="'icon download pi pi-download'"
            @click="descargaArquivo()" />
          <span
            v-else
            :class="'fa fa-file-circle-xmark'"
            v-tooltip.left="t('axuda.errors.error-file-not-found')" />
        </div>
        <div v-else>
          <span class="icon download pi pi-spin pi-spinner" />
        </div>
      </a>
    </div>
    <div v-if="!loadingValidacionsCarga">
      <ListadoValidacionsCarga :tipoInstrumento="'po'" />
      <ListadoValidacionsCarga :tipoInstrumento="'dx'" />
      <ListadoValidacionsCarga :tipoInstrumento="'ams'" />
    </div>
    <div v-else class="list-loading">
      <i class="pi pi-spin pi-spinner" style="font-size: 3rem" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-apartado-arquivo {
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(33, 37, 41);
}
.flota-derecha {
  display: flex;
  justify-content: right;
}
</style>
