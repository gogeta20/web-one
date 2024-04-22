<script setup lang="ts">
import { getDescargarArchivoByRuta } from "@/altaSolicitude/infrastructure/useCases/files/getDescargarArchivoByRuta";
import {
  arquivosSeccionInicial,
  type ArquivoSeccion,
  type ArquivosSeccion,
} from "@/shared/dominio/arquivosSeccions/ArquivosSeccion";
import { useAyudaStore } from "@/shared/store/ayudaStore";
import { saveAs } from "file-saver";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { computed, onMounted, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import type { ArquivosSubseccion } from "../../dominio/arquivosSeccions/ArquivosSeccion";
const ayudaStore = useAyudaStore();
const { t } = useI18n();
const props = defineProps({
  seccion: {
    type: String,
    required: true,
  },
});
const { seccion } = toRefs(props);
const arquivosSeccion = computed(() => {
  return ayudaStore.arquivosSeccion;
});
const arquivosSeccionSeleccionado = ref<ArquivosSeccion>(arquivosSeccionInicial);

function descargaArquivo(subseccion: ArquivosSubseccion, arquivo: ArquivoSeccion) {
  arquivo.loadingDescarga = true;
  const subseccionRuta =
    typeof subseccion.dataSubseccion !== "string" ? subseccion.dataSubseccion.ruta : "";
  const rutaArquivo = arquivo.seccion.ruta + subseccionRuta + arquivo.ruta;
  getDescargarArchivoByRuta(rutaArquivo, arquivo.ruta)
    .then((response) => {
      saveAs(response, arquivo.ruta);
      arquivo.loadingDescarga = false;
    })
    .catch(() => {
      arquivo.loadingDescarga = false;
    });
}

onMounted(async () => {
  if (seccion.value in arquivosSeccion.value) {
    arquivosSeccionSeleccionado.value =
      arquivosSeccion.value[seccion.value as keyof typeof arquivosSeccion.value];
  }
});
</script>

<template>
  <div v-if="Object.keys(arquivosSeccionSeleccionado).length > 0">
    <div class="row d-flex justify-content-start">
      <div class="col-6">
        <h5 class="subTitleSection">{{ arquivosSeccionSeleccionado.descricion }}</h5>
      </div>
    </div>

    <Accordion
      class="filtersBody"
      :multiple="true"
      v-if="
        arquivosSeccionSeleccionado.seccion != 'PLANOS_TIPO' &&
        arquivosSeccionSeleccionado.seccion != 'IMPORTACION_DATOS'
      ">
      <AccordionTab
        v-for="(subseccion, index) in arquivosSeccionSeleccionado.subsecciones"
        :key="index"
        :header="subseccion.dataSubseccion.descricion">
        <div
          v-if="
            typeof subseccion.dataSubseccion !== 'string' &&
            Object.keys(subseccion.dataSubseccion).length > 0
          ">
          <div v-for="(arquivo, indexArquivo) in subseccion.arquivos" :key="indexArquivo">
            <div v-if="Object.keys(arquivo).length > 0">
              <div class="row apartado-arquivo">
                <div class="col-11 sub-apartado-arquivo">
                  {{ arquivo.descricion }}
                </div>
                <div class="col-1 sub-apartado-arquivo">
                  <div v-if="!arquivo.loadingDescarga">
                    <span
                      v-if="arquivo.existeArquivo"
                      v-tooltip.left="t('core.buttons.download')"
                      :class="'icon download pi pi-download'"
                      @click="descargaArquivo(subseccion, arquivo)" />
                    <span
                      v-else
                      :class="'fa fa-file-circle-xmark'"
                      v-tooltip.left="t('axuda.errors.error-file-not-found')" />
                  </div>
                  <div v-else>
                    <span class="icon download pi pi-spin pi-spinner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionTab>
    </Accordion>

    <div v-else>
      <div v-for="(subseccion, index) in arquivosSeccionSeleccionado.subsecciones" :key="index">
        <div class="apartado-seccion">
          <div
            v-if="
              typeof subseccion.dataSubseccion !== 'string' &&
              Object.keys(subseccion.dataSubseccion).length > 0
            ">
            <div class="strong">
              {{ subseccion.dataSubseccion.descricion }}
            </div>
          </div>

          <div v-for="(arquivo, indexArquivo) in subseccion.arquivos" :key="indexArquivo">
            <div v-if="Object.keys(arquivo).length > 0">
              <div class="row apartado-arquivo">
                <div class="col-11 sub-apartado-arquivo">
                  {{ arquivo.descricion }}
                </div>
                <div class="col-1 sub-apartado-arquivo">
                  <div v-if="!arquivo.loadingDescarga">
                    <span
                      v-if="arquivo.existeArquivo"
                      v-tooltip.left="t('core.buttons.download')"
                      :class="'icon download pi pi-download'"
                      @click="descargaArquivo(subseccion, arquivo)" />
                    <span
                      v-else
                      :class="'fa fa-file-circle-xmark'"
                      v-tooltip.left="t('axuda.errors.error-file-not-found')" />
                  </div>
                  <div v-else>
                    <span class="icon download pi pi-spin pi-spinner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
