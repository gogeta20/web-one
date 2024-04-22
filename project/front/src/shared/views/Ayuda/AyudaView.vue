<script setup lang="ts">
import { useAyudaStore } from "@/shared/store/ayudaStore";
import DatosContacto from "@/shared/views/Ayuda/DatosContacto.vue";
import FormAyudaSugerencia from "@/shared/views/Ayuda/FormAyudaSugerencia.vue";
import ListadoArquivosSeccion from "@/shared/views/Ayuda/ListadoArquivosSeccion.vue";
import TablaCartografia from "@/shared/views/Ayuda/TablaCartografia.vue";
import ValidacionsCarga from "@/shared/views/Ayuda/ValidacionsCarga.vue";
import Card from "primevue/card";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const ayudaStore = useAyudaStore();
const { t } = useI18n();
const permisoEnviarSugerencias = computed(() => {
  return ayudaStore.permisoEnviarSugerencias;
});
const permisoVerSeccionValidacionPlanos = computed(() => {
  return ayudaStore.permisoVerSeccionValidacionPlanos;
});
const showFormAyudaSugerencia = computed(() => {
  return ayudaStore.showFormAyudaSugerencia;
});
const loadingArquivosSeccionsAll = computed(() => {
  return ayudaStore.loadingArquivosSeccionsAll;
});

function openFormSugerencia() {
  ayudaStore.showFormAyudaSugerencia = true;
}

onMounted(async () => {
  ayudaStore.comprobarPermisoEnviarSugerencias();
  ayudaStore.comprobarPermisoVerSeccionValidacionPlanos();
  ayudaStore.getAllArquivosSeccions();
  if (permisoVerSeccionValidacionPlanos.value) {
    ayudaStore.getValidacionsCarga();
  }
  ayudaStore.getDatosContacto();
});
</script>

<template>
  <Card class="shadow">
    <template #title>
      {{ t("axuda.header-axuda") }}
      <div class="right" v-if="permisoEnviarSugerencias">
        <div
          id="enviar_suxerencia"
          @click="openFormSugerencia"
          class="boton boton_enviar_suxerencias">
          <i class="fa-regular fa-envelope" />
        </div>
      </div>
      <!-- v-tooltip.right="t('axuda.header-enviar-suxerencia')" -->
    </template>
    <template #content>
      <div v-if="!loadingArquivosSeccionsAll">
        <div class="row">
          <div class="col-6 listado-lateral">
            <ListadoArquivosSeccion :seccion="'MANUAIS'" />
          </div>
          <div class="col-6 listado-lateral">
            <ListadoArquivosSeccion :seccion="'PLANOS_TIPO'" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <TablaCartografia :seccion="'CARTOGRAFIA_APOIO'" />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <ListadoArquivosSeccion :seccion="'IMPORTACION_DATOS'" />
          </div>
        </div>
      </div>
      <div v-else class="list-loading">
        <i class="pi pi-spin pi-spinner" style="font-size: 3rem" />
      </div>
    </template>
  </Card>
  <Card v-if="permisoVerSeccionValidacionPlanos" class="shadow bottom-class">
    <template #title>
      {{ t("axuda.header-validacions-carga") }}
    </template>
    <template #content>
      <ValidacionsCarga class="apartados-ayuda" />
    </template>
  </Card>
  <Card class="shadow bottom-class">
    <template #title>
      {{ t("axuda.header-datos-contacto") }}
    </template>
    <template #content>
      <DatosContacto class="apartados-ayuda" />
    </template>
  </Card>
  <FormAyudaSugerencia v-if="showFormAyudaSugerencia" />
</template>

<style lang="scss" scoped>
.right {
  float: right;
  font-size: 18px;

  i {
    color: rgb(23, 162, 184);
    &:hover {
      cursor: pointer;
      font-size: 20px;
    }
  }
}

::v-deep(.fa-file-circle-xmark) {
  color: var(--warning-blond);
}

.bottom-class {
  margin-top: 20px;
}
.sub-apartado-arquivo {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
