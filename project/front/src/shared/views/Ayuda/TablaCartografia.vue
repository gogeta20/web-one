<script setup lang="ts">
import { getDescargarArchivoByRuta } from "@/altaSolicitude/infrastructure/useCases/files/getDescargarArchivoByRuta";
import type {
  ArquivoSeccion,
  ArquivosSubseccion,
} from "@/shared/dominio/arquivosSeccions/ArquivosSeccion";
import { useAyudaStore } from "@/shared/store/ayudaStore";
import { saveAs } from "file-saver";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const ayudaStore = useAyudaStore();
const { t } = useI18n();
const cartografiaSeccionApoyo = computed(() => {
  return ayudaStore.cartografiaSeccion.CARTOGRAFIA_APOIO;
});

function classLimitRow(length: number, limit: number) {
  return length - limit !== 1 ? "row custom-row limit-row" : "row custom-row limit-last-row";
}

function classLastCell(length: number, limit: number) {
  return length - limit !== 1
    ? "apartado-cartografia custom-last-cell"
    : "apartado-cartografia custom-last-last-cell";
}

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

function abrirRutaArchivo(arquivo: ArquivoSeccion) {
  window.open(arquivo.ruta, "_blank");
}
</script>

<template>
  <div v-if="cartografiaSeccionApoyo.length > 0" class="listado-cartografia">
    <div class="row d-flex justify-content-start">
      <div class="col-6">
        <h5 class="subTitleSection">{{ t("axuda.header-cartografia") }}</h5>
      </div>
    </div>
    <div v-for="(seccion, index) in cartografiaSeccionApoyo" :key="index">
      <div :class="classLimitRow(cartografiaSeccionApoyo.length, index)">
        <div class="strong-no-margin col-3 celdas-custom apartado-cartografia custom-first-cell">
          <div class="text-celda">
            {{ seccion.descricion }}
          </div>
        </div>
        <div class="col-9 celdas-custom">
          <div v-for="(subseccion, indexS) in seccion.subsecciones" :key="indexS">
            <div class="row custom-row">
              <div
                v-if="
                  typeof subseccion.dataSubseccion !== 'string' &&
                  Object.keys(subseccion.dataSubseccion).length > 0
                "
                class="strong-no-margin col celdas-custom apartado-cartografia">
                <div class="text-celda">
                  {{ subseccion.dataSubseccion.descricion }}
                </div>
              </div>
              <div class="col celdas-custom">
                <div v-for="(arquivo, indexArquivo) in subseccion.arquivos" :key="indexArquivo">
                  <div v-if="Object.keys(arquivo).length > 0">
                    <div :class="classLastCell(subseccion.arquivos.length, indexArquivo)">
                      <div class="col-11 celdas-custom sub-apartado-arquivo">
                        <div class="text-celda">
                          {{ arquivo.descricion }}
                        </div>
                      </div>
                      <div class="col-1 celdas-custom sub-apartado-arquivo">
                        <div v-if="!arquivo.loadingDescarga">
                          <span
                            v-if="arquivo.existeArquivo"
                            v-tooltip.left="t('core.buttons.download')"
                            :class="'icon download pi pi-download'"
                            @click="descargaArquivo(subseccion, arquivo)" />
                          <span
                            v-else-if="!arquivo.existeArquivo && arquivo.ruta.startsWith('https:')"
                            v-tooltip.left="t('core.buttons.redirect')"
                            :class="'icon redirect fa fa-external-link'"
                            @click="abrirRutaArchivo(arquivo)" />
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
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  cursor: pointer;
  font-weight: bold;
  &.download {
    color: var(--primary-color);
  }
  &.redirect {
    color: var(--success-color);
  }
}
.listado-cartografia {
  padding-left: 10px;
  padding-right: 30px;
}

.apartado-cartografia {
  border: solid;
  border-width: 1px;
  border-color: #d5d5d5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.celdas-custom {
  padding: 0rem;
}
.text-celda {
  padding: 8px;
}
.strong-no-margin {
  font-weight: bold;
}
.custom-row {
  --bs-gutter-x: 0;
  --bs-gutter-y: 0;
  margin-left: -1px;
  margin-right: -1px;
  margin-top: 0px;
  margin-bottom: -1px;
}
.custom-first-cell {
  margin-bottom: -1px;
}
</style>
