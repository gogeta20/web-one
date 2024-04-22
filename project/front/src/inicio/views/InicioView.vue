<script setup lang="ts">
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { useI18nStore } from "@/core/i18n/store/i18nStore";
import type { NoticeToShow } from "@/inicio/dominio/NoticeToShow";
import { dateEdit, dateLimit, dateToday, formatSend } from "@/inicio/dominio/services/NovasFormat";
import { checkAviso } from "@/inicio/infrastructure/useCases/CheckAviso";
import { useNovasStore } from "@/inicio/store/novasStore";
import router from "@/core/router";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const i18nStore = useI18nStore();
onMounted(async () => {
  locale.value = i18nStore.getLanguage();
  await onSearch();
});
const novasStore = useNovasStore();
const usuarioStore = useUsuarioStore();

const displayFlip = ref("block");
const checked = ref(true);
const activeFiltersAdvantace = ref<boolean>(false);

watch(checked, async () => {
  if (checked.value) {
    displayFlip.value = "block";
  } else {
    displayFlip.value = "none";
  }
});
const PERMISO_NOVAS = "verListadoNovasFiltroNivel";
const permissionFiltroNivel = usuarioStore.getPermission(PERMISO_NOVAS);

const novas = ref<NoticeToShow[]>([]);
const loading = ref(false);
const flipCalendar = ref(false);

const expandedRowGroups = ref();
const showTable = ref(false);

const value1 = ref("");
const todayCalendar = ref(dateToday());

const lastweek = dateEdit(7);
const lastDay = lastweek.getDate();
const lastMonth = lastweek.getMonth();
const lastYear = lastweek.getFullYear();
const lastWeekPresent = new Date(lastYear, lastMonth, lastDay);
const dateSelectedIni = ref(lastWeekPresent);
const dateSelectedLast = ref(dateToday());
const keyTab = ref(undefined);

const minCalendarValue = ref(dateLimit(dateSelectedIni.value));

const states = ref([
  { state: t("inicio.state.lidas"), value: "lidas" },
  { state: t("inicio.state.noLidas"), value: "noLidas" },
  { state: t("inicio.todas"), value: "todas" },
]);
const stateSelected = ref(states.value[1]);

const times = ref([
  { time: "7 dias", value: "week" },
  { time: "1 mes", value: "month" },
  { time: "1 año", value: "year" },
]);
const timeSelected = ref(times.value[0]);

const ambits = ref([
  { ambit: t("inicio.ambito.serviciosCentrais"), value: "serviciosCentrais" },
  { ambit: t("inicio.ambito.provincias"), value: "provincia" },
  { ambit: t("inicio.ambito.distritos"), value: "distrito" },
  { ambit: t("inicio.ambito.organismosExternos"), value: "organismosExternos" },
  { ambit: t("inicio.ambito.usuario"), value: "usuario" },
  { ambit: t("inicio.todas"), value: "todas" },
]);
const ambitSelected = ref(ambits.value[5]);

function calendarFlip() {
  flipCalendar.value = !flipCalendar.value;
}

function limitDateListenterDiv() {
  minCalendarValue.value = dateLimit(dateSelectedIni.value);
}

function settingDate() {
  if (!flipCalendar.value) {
    dateSelectedLast.value = dateToday();
    const textDate = timeSelected.value.value;
    if (textDate === "week") {
      dateSelectedIni.value = dateEdit(8);
    } else if (textDate == "month") {
      dateSelectedIni.value = dateEdit(32);
    } else {
      dateSelectedIni.value = dateEdit(366);
    }
  }
}

async function onSearch() {
  try {
    loading.value = true;
    showTable.value = false;
    activeFiltersAdvantace.value = false;
    settingDate();
    const filters = getFilters();
    await novasStore.novasMonusrStore();
    await novasStore.avisosStore(filters, permissionFiltroNivel, usuarioStore.datos.lang);
    novas.value = [];
    novas.value = novasStore.getAllStore();
    showTable.value = true;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
}

function getFilters() {
  return {
    state: stateSelected.value.value,
    ambit: ambitSelected.value.value,
    text: value1.value,
    timeCustomIniJs: dateSelectedIni.value,
    timeCustomEndJs: dateSelectedLast.value,
    timeCustomIni: formatSend(dateSelectedIni.value),
    timeCustomEnd: formatSend(dateSelectedLast.value, true),
  };
}

async function checkToReadAviso(element: NoticeToShow) {
  try {
    hiddenElement(element);
    await checkAviso(element.id);
  } catch (e) {
    console.error(e);
  }
}

async function goInstrumento(element: NoticeToShow) {
  const tipo = element.codTipo;
  let base = "proxecto-ordenacion";
  if (tipo == "DCX") {
    base = "doc-compartido-xestion";
  } else if (tipo == "DSX") {
    base = "doc-simple-xestion";
  }
  const pathp = `/${base}/resumen/datos-xerais/${element.idxf}`;
  const routde = router.resolve({ path: pathp });
  checkToReadAviso(element);
  window.open(routde.href, "_blank");
}

function hiddenElement(d: NoticeToShow) {
  let hiddenId = "";
  let $fadeout = "fade-out";
  let targetElement: HTMLElement | null;
  if (stateSelected.value.value == "todas") {
    hiddenId = "TheBtn-" + d.id;
    targetElement = document.getElementById(hiddenId);
    $fadeout = "fade-out-full";
  } else {
    hiddenId = "TheDiv-" + d.id;
    const btn = document.getElementById(hiddenId);
    targetElement = btn?.parentNode?.parentNode as HTMLElement;
  }

  targetElement?.classList.add($fadeout);
  setTimeout(function () {
    targetElement?.classList.add("displayNone");
  }, 1000);
}
</script>

<template>
  <div class="filters">
    <div v-if="permissionFiltroNivel">
      <label>{{ t("inicio.ambitoText") }}</label>
      <Dropdown v-model="ambitSelected" :options="ambits" optionLabel="ambit" />
    </div>
    <div class="filters-states">
      <label>{{ t("inicio.state.title") }}</label>
      <Dropdown
        v-model="stateSelected"
        :options="states"
        optionLabel="state"
        :placeholder="t('inicio.state.noLidas')" />
    </div>
    <div class="filters-text">
      <label>{{ t("inicio.texto") }}</label>
      <InputText v-model="value1" type="text" :placeholder="t('inicio.texto')" />
    </div>
    <div class="flex gap-3">
      <div class="align-self-end">
        <Button
          label=""
          icon="pi pi-calendar"
          class="p-button-success p-button-rounded"
          iconPos="left"
          @click="calendarFlip" />
      </div>
      <div>
        <div v-show="!flipCalendar">
          <label>{{ t("inicio.rango") }}</label>
          <Dropdown v-model="timeSelected" :options="times" optionLabel="time" />
        </div>
        <div v-show="flipCalendar">
          <div class="flex gap-2">
            <div>
              <label>{{ t("inicio.desde") }}</label>
              <Calendar
                id="iconIni"
                v-model="dateSelectedIni"
                :showIcon="true"
                :disabledDays="[0, 6]"
                :manualInput="false"
                :showButtonBar="true"
                :maxDate="dateSelectedLast" />
            </div>

            <div @click="limitDateListenterDiv()" @keydown.tab="keyTab">
              <label>{{ t("inicio.hasta") }}</label>
              <Calendar
                id="iconLast"
                v-model="dateSelectedLast"
                :showIcon="true"
                :disabledDays="[0, 6]"
                :manualInput="false"
                :showButtonBar="true"
                :minDate="minCalendarValue"
                :maxDate="todayCalendar" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filters-item buttonSection">
      <Button iconPos="left" :loading="loading" @click="onSearch">
        <span class="pi pi-search" />
      </Button>
    </div>
  </div>
  <div class="container-novas-list">
    <DataTable
      v-model:expandedRowGroups="expandedRowGroups"
      :stripedRows="false"
      :value="novas"
      class="p-datatable-customers"
      :paginator="true"
      dataKey="id"
      :loading="loading"
      :rows="30">
      <Column field="content" filterMatchMode="startsWith" :sortable="false">
        <template #body="{ data }">
          <div :id="'TheDiv-' + data.id" :class="'container-main ' + data.mainContainer">
            <div :class="'container-avisos ' + data.background">
              <div class="flex justify-content-between">
                <div class="bold container-title flex align-items-center">
                  <div class="container-icon">
<!--                    <FontAwesomeIcon :icon="data.icon" />-->
                  </div>
                  <div class="p-1r">
                    {{ data.title }}
                  </div>
                </div>
                <div class="bold">
                  {{ data.date }}
                </div>
              </div>
              <div class="container-content flex justify-content-between">
                <div>
                  <span v-html="data.content" />
                </div>
                <div v-if="!data.btn" class="flex gap-2 align-self-end">
                  <Button
                    v-show="data.type"
                    :id="'TheBtnInst-' + data.id"
                    v-tooltip.left="'Ver'"
                    label=""
                    icon="pi pi-send"
                    class="p-button-rounded p-button-outlined"
                    iconPos="left"
                    @click="goInstrumento(data)" />
                  <Button
                    v-show="data.type"
                    :id="'TheBtn-' + data.id"
                    v-tooltip.left="'Marcar como lido'"
                    label=""
                    icon="pi pi-check"
                    class="p-button-rounded p-button-outlined"
                    iconPos="left"
                    @click="checkToReadAviso(data)" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;

  .filters-text {
    width: 70%;
  }

  .filters-item.buttonSection {
    display: flex;

    button {
      margin: 0 0 0 auto;
      margin-top: 1.8rem;
    }
  }
}

.novaPrivate {
  padding-bottom: 1rem;
  display: none;
  background-color: red;
}
.novaPublic {
  padding-bottom: 1rem;
}
.avisosMain {
  padding-bottom: 1rem;
}
.container-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}
.container-title {
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 3px;
}
.container-content {
  padding: 1rem;
}

.novasClass {
  background-color: #38bdf866;
}
.avisosClass {
  background-color: #ffbf8266;
}
.container-avisos {
  padding: 1rem;
  border-radius: 5px;
}
::v-deep(.p-paginator) {
  .p-paginator-current {
    margin-left: auto;
  }
}

::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;

  .p-progressbar-value {
    background-color: #607d8b;
  }
}

::v-deep(.p-datepicker) {
  min-width: 25rem;

  td {
    font-weight: 400;
  }
}

::v-deep(.p-datatable.p-datatable-customers) {
  .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
  }

  .p-paginator {
    padding: 1rem;
  }

  .p-datatable-thead > tr > th {
    text-align: left;
  }

  .p-datatable-tbody > tr > td {
    cursor: auto;
    border: none;
    padding: 6px 0;
  }

  .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;
  }
  .p-datatable-tbody > tr > td {
    padding: 0 0;
  }
}
@media (max-width: 910px) {
  #container-avisos {
    display: block !important;
  }

  .container-novas-list .container-main {
    width: 100%;
  }
}
</style>
