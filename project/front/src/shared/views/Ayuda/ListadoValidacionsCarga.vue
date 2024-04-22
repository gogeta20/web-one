<script setup lang="ts">
import type { ValidacionTitleDocumentos } from "@/shared/dominio/arquivosSeccions/ValidacionCarga";
import { useAyudaStore } from "@/shared/store/ayudaStore";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { computed, onMounted, ref, toRefs } from "vue";
import { validacionTitleDocumentosInicial } from "../../dominio/arquivosSeccions/ValidacionCarga";
const ayudaStore = useAyudaStore();
const props = defineProps({
  tipoInstrumento: {
    type: String,
    required: true,
  },
});
const { tipoInstrumento } = toRefs(props);
const showApartadoValidacions = ref<boolean>(false);
const validacionCarga = ref<ValidacionTitleDocumentos>(validacionTitleDocumentosInicial);
const validacionsCarga = computed(() => {
  return ayudaStore.validacionsCarga;
});

function changeShowApartadoValidacions() {
  showApartadoValidacions.value = !showApartadoValidacions.value;
}

onMounted(async () => {
  if (tipoInstrumento.value in validacionsCarga.value) {
    validacionCarga.value =
      validacionsCarga.value[tipoInstrumento.value as keyof typeof validacionsCarga.value];
  }
});
</script>

<template>
  <div>
    <div class="row d-flex justify-content-start">
      <div @click="changeShowApartadoValidacions" class="col-6 title-apartado-validacions">
        <div class="icon-custom">
          <i v-if="showApartadoValidacions" class="fa-solid fa-circle-right" />
          <i v-else class="fa-solid fa-circle-down" />
        </div>
        <h5 class="subTitleSection custom-subtitle">{{ validacionCarga.title }}</h5>
      </div>
    </div>
    <div v-show="showApartadoValidacions">
      <div v-for="(documento, index) in validacionCarga.documentos" :key="index">
        <div class="apartado-acordeon">
          <Accordion :activeIndex="1">
            <AccordionTab :header="documento.title">
              <div
                v-for="(validation, indexDocumento) in documento.validations"
                :key="indexDocumento">
                <ul class="item-list-custom">
                  <li><div v-html="validation.validacion" /></li>
                </ul>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-custom {
  color: var(--primary-color);
  justify-content: center;
  display: flex;
  font-size: 1.5rem;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  margin-right: 10px;
}
.title-apartado-validacions {
  cursor: pointer;
  display: flex;
}
.item-list-custom {
  list-style-type: disc;
  color: var(--primary-color);
}
.item-list-custom li div {
  color: var(--medium-gray);
}
.custom-subtitle {
  flex: 1;
}
.apartado-acordeon {
  color: var(--primary-color);
  margin-bottom: 2px;
}
::v-deep(.p-accordion-content) {
  background-color: rgba(29, 113, 255, 0.06);
}
</style>
