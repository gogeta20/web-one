<script setup lang="ts">
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { useI18nStore } from "@/core/i18n/store/i18nStore";
import type { NoticeToShow } from "@/inicio/dominio/NoticeToShow";
import { dateEdit, dateLimit, dateToday, formatSend } from "@/inicio/dominio/services/NovasFormat";
import { checkAviso } from "@/inicio/infrastructure/useCases/CheckAviso";
import { useNovasStore } from "@/inicio/store/novasStore";
import Article from "@/shared/views/article/Article.vue";
import router from "@/core/router";
// //import Button from "primevue/button";
// import Calendar from "primevue/calendar";
// import Column from "primevue/column";
// import DataTable from "primevue/datatable";
// import Dropdown from "primevue/dropdown";
// import InputText from "primevue/inputtext";
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
  <header>
    <h1>Cool Articles</h1>
  </header>
  <div class="band">
    <div class="item-1">
      <a href="https://design.tutsplus.com/articles/international-artist-feature-malaysia--cms-26852" class="card">
        <div class="thumb" style="background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-1.jpg);"></div>
        <article>
          <h1>International Artist Feature: Malaysia</h1>
          <span>Mary Winkler</span>
        </article>
      </a>
    </div>
    <Article
        href="https://design.tutsplus.com/articles/envato-tuts-community-challenge-created-by-you-july-edition--cms-26724"
        image="background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/landing.png);"
        title="How to Code a Scrolling “Alien Lander” Website"
        description="We’ll be putting things together so that as you scroll down from the top of the page you’ll see an “Alien Lander” making its way to touch down."
        signe="Kezz Bracey"
    />
    <Article
        href="https://design.tutsplus.com/articles/envato-tuts-community-challenge-created-by-you-july-edition--cms-26724"
        image="background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/landing.png);"
        title="How to Code a Scrolling “Alien Lander” Website"
        description="We’ll be putting things together so that as you scroll down from the top of the page you’ll see an “Alien Lander” making its way to touch down."
        signe="Kezz Bracey"
    />
    <Article
        href="https://design.tutsplus.com/articles/envato-tuts-community-challenge-created-by-you-july-edition--cms-26724"
        image="background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/landing.png);"
        title="How to Code a Scrolling “Alien Lander” Website"
        description="We’ll be putting things together so that as you scroll down from the top of the page you’ll see an “Alien Lander” making its way to touch down."
        signe="Kezz Bracey"
    />
  </div>

</template>

<style lang="scss" scoped>
.band {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;

  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;

  @media (min-width: 30em) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 60em) {
    grid-template-columns: repeat(4, 1fr);
  }
}

header {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
}
</style>
