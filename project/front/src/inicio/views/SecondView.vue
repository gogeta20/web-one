<script setup lang="ts">
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import { useI18nStore } from "@/core/i18n/store/i18nStore";
import type { NoticeToShow } from "@/inicio/dominio/NoticeToShow";
import { dateEdit, dateLimit, dateToday, formatSend } from "@/inicio/dominio/services/NovasFormat";
import { checkAviso } from "@/inicio/infrastructure/useCases/CheckAviso";
import { useNovasStore } from "@/inicio/store/novasStore";
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
  <div class="popular-articles">
    <header class="popular-header header-card white-underline-links">
      <h2 class="header-card-title">
        Popular <br>this <br>month
      </h2>
      <p class="header-card-sponsor">Sponsored by<br>
        <a href="https://synd.co/36GY7hS">Frontend Masters</a>
      </p>
    </header>
    <div class="mini-card-grid">
      <article class="mini-card module module-article article" id="mini-post-302186">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-28">
                Jan 28, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/use-and-reuse-everything-in-svg-even-animations/" class="article-card-header read-article">
                Use and Reuse Everything in SVG  Even Animations! </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/marianabeldi/">
                <img alt="" src="https://secure.gravatar.com/avatar/d478c83f5a06bd37f7087e19478b74bf?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image jetpack-lazy-image--handled" height="80" width="80" srcset="https://secure.gravatar.com/avatar/d478c83f5a06bd37f7087e19478b74bf?s=160&amp;d=retro&amp;r=pg  2x" data-lazy-loaded="1"><noscript><img alt='' src='https://secure.gravatar.com/avatar/d478c83f5a06bd37f7087e19478b74bf?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/d478c83f5a06bd37f7087e19478b74bf?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/marianabeldi/">
                Mariana Beldi </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/svg/" rel="tag">SVG</a> <a href="https://css-tricks.com/tag/svg-animation/" rel="tag">SVG animation</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-302263">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-27">
                Jan 27, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/what-does-revert-do-in-css/" class="article-card-header read-article">
                What does revert do in CSS? </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/chriscoyier/">
                <img alt="" src="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image jetpack-lazy-image--handled" height="80" width="80" srcset="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=160&amp;d=retro&amp;r=pg  2x" data-lazy-loaded="1"><noscript><img alt='' src='https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/chriscoyier/">
                Chris Coyier </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/inheritence/" rel="tag">inheritence</a> <a href="https://css-tricks.com/tag/revert/" rel="tag">revert</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-300744">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-01">
                Jan 1, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/new-year-new-job-lets-make-a-grid-powered-resume/" class="article-card-header read-article">
                New Year, New Job? Let`s Make a Grid-Powered Resume! </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/alichurcher/">
                <img alt="" src="https://secure.gravatar.com/avatar/65b8591c0b8bb7e304163a8f6dfd8b20?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image jetpack-lazy-image--handled" height="80" width="80" srcset="https://secure.gravatar.com/avatar/65b8591c0b8bb7e304163a8f6dfd8b20?s=160&amp;d=retro&amp;r=pg  2x" data-lazy-loaded="1"><noscript><img alt='' src='https://secure.gravatar.com/avatar/65b8591c0b8bb7e304163a8f6dfd8b20?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/65b8591c0b8bb7e304163a8f6dfd8b20?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/alichurcher/">
                Ali Churcher </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/grid/" rel="tag">grid</a> <a href="https://css-tricks.com/tag/jobs/" rel="tag">jobs</a> <a href="https://css-tricks.com/tag/print/" rel="tag">print</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-301107">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-09">
                Jan 9, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/understanding-async-await/" class="article-card-header read-article">
                Understanding Async Await </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/sdrasner/">
                <img alt="" src="https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image jetpack-lazy-image--handled" height="80" width="80" srcset="https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=160&amp;d=retro&amp;r=pg  2x" data-lazy-loaded="1"><noscript><img alt='' src='https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/sdrasner/">
                Sarah Drasner </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/async/" rel="tag">async</a> <a href="https://css-tricks.com/tag/asynchronous/" rel="tag">asynchronous</a> <a href="https://css-tricks.com/tag/await/" rel="tag">await</a> <a href="https://css-tricks.com/tag/javascript/" rel="tag">JavaScript</a> <a href="https://css-tricks.com/tag/promises/" rel="tag">promises</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-302289">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-23">
                Jan 23, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/building-multi-directional-layouts/" class="article-card-header read-article">
                Building Multi-Directional Layouts </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/ahmadalfy/">
                <img alt="" src="https://secure.gravatar.com/avatar/981b46396a22bf5a8190506fe892b3b5?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image jetpack-lazy-image--handled" height="80" width="80" srcset="https://secure.gravatar.com/avatar/981b46396a22bf5a8190506fe892b3b5?s=160&amp;d=retro&amp;r=pg  2x" data-lazy-loaded="1"><noscript><img alt='' src='https://secure.gravatar.com/avatar/981b46396a22bf5a8190506fe892b3b5?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/981b46396a22bf5a8190506fe892b3b5?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/ahmadalfy/">
                Ahmad El-Alfy </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/logical-properties/" rel="tag">logical properties</a> <a href="https://css-tricks.com/tag/writing-mode/" rel="tag">writing-mode</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-301006">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-13">
                Jan 13, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/how-to-animate-on-the-web-with-greensock/" class="article-card-header read-article">
                How to Animate on the Web With GreenSock </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/sdrasner/">
                <img alt="" src="https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image jetpack-lazy-image--handled" height="80" width="80" srcset="https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=160&amp;d=retro&amp;r=pg  2x" data-lazy-loaded="1"><noscript><img alt='' src='https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/48cfd8342f9b9e5b7970f63afb0a8ee3?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/sdrasner/">
                Sarah Drasner </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/animation/" rel="tag">animation</a> <a href="https://css-tricks.com/tag/greensock/" rel="tag">GreenSock</a> <a href="https://css-tricks.com/tag/gsap/" rel="tag">GSAP</a> <a href="https://css-tricks.com/tag/svg/" rel="tag">SVG</a> <a href="https://css-tricks.com/tag/web-animation/" rel="tag">web animation</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-302303">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-30">
                Jan 30, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/understanding-immutability-in-javascript/" class="article-card-header read-article">
                Understanding Immutability in JavaScript </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/kinglseysilas/">
                <img alt="" src="https://secure.gravatar.com/avatar/b0d0ce2a0e59387acbf0848f62aa52bf?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image" height="80" width="80" data-lazy-srcset="https://secure.gravatar.com/avatar/b0d0ce2a0e59387acbf0848f62aa52bf?s=160&amp;d=retro&amp;r=pg 2x" data-lazy-src="https://secure.gravatar.com/avatar/b0d0ce2a0e59387acbf0848f62aa52bf?s=80&amp;is-pending-load=1#038;d=retro&amp;r=pg" srcset="data:image/gif;base64 ,https://css-tricks.com/R0lGODlhAQABAIAAAAAAAP/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 "><noscript><img alt='' src='https://secure.gravatar.com/avatar/b0d0ce2a0e59387acbf0848f62aa52bf?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/b0d0ce2a0e59387acbf0848f62aa52bf?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/kinglseysilas/">
                Kingsley Silas </a>
            </div>
          </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-301620">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-29">
                Jan 29, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/practice-graphql-queries-with-the-state-of-javascript-api/" class="article-card-header read-article">
                Practice GraphQL Queries With the State of JavaScript API </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/sachagreif/">
                <img alt="" src="https://secure.gravatar.com/avatar/027d1ebf66cc039a0bd3b55eeadbe75d?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image" height="80" width="80" data-lazy-srcset="https://secure.gravatar.com/avatar/027d1ebf66cc039a0bd3b55eeadbe75d?s=160&amp;d=retro&amp;r=pg 2x" data-lazy-src="https://secure.gravatar.com/avatar/027d1ebf66cc039a0bd3b55eeadbe75d?s=80&amp;is-pending-load=1#038;d=retro&amp;r=pg" srcset="data:image/gif;base64 ,https://css-tricks.com/R0lGODlhAQABAIAAAAAAAP/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 "><noscript><img alt='' src='https://secure.gravatar.com/avatar/027d1ebf66cc039a0bd3b55eeadbe75d?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/027d1ebf66cc039a0bd3b55eeadbe75d?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/sachagreif/">
                Sacha Greif </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/api/" rel="tag">api</a> <a href="https://css-tricks.com/tag/graphql/" rel="tag">graphql</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article link" id="mini-post-301351">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Link
              <time datetime="2020-01-09">
                Jan 9, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://overreacted.io/on-let-vs-const/" class="article-card-header read-article">
                let vs. const </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/chriscoyier/">
                <img alt="" src="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image" height="80" width="80" data-lazy-srcset="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=160&amp;d=retro&amp;r=pg 2x" data-lazy-src="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&amp;is-pending-load=1#038;d=retro&amp;r=pg" srcset="data:image/gif;base64 ,https://css-tricks.com/R0lGODlhAQABAIAAAAAAAP/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 "><noscript><img alt='' src='https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/chriscoyier/">
                Chris Coyier </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/javascript/" rel="tag">JavaScript</a> <a href="https://css-tricks.com/tag/variables/" rel="tag">variables</a> </div>
        </div>
      </article>
      <article class="mini-card module module-article article" id="mini-post-300931">
        <header class="mini-article-card-header">
          <div class="mini-article-card-title">
            <div class="mini-article-subhead">
              Article
              <time datetime="2020-01-13">
                Jan 13, 2020 </time>
            </div>
            <h2 class="">
              <a href="https://css-tricks.com/animate-text-on-scroll/" class="article-card-header read-article">
                Animate Text on Scroll </a>
            </h2>
          </div>
        </header>
        <div class="mini-article-meta">
          <div class="mini-article-byline">
            <div class="author-avatar">
              <a class="author-name" href="https://css-tricks.com/author/chriscoyier/">
                <img alt="" src="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&amp;d=retro&amp;r=pg" class="avatar avatar-80 photo jetpack-lazy-image" height="80" width="80" data-lazy-srcset="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=160&amp;d=retro&amp;r=pg 2x" data-lazy-src="https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&amp;is-pending-load=1#038;d=retro&amp;r=pg" srcset="data:image/gif;base64 ,https://css-tricks.com/R0lGODlhAQABAIAAAAAAAP/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 "><noscript><img alt='' src='https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=80&#038;d=retro&#038;r=pg' srcset='https://secure.gravatar.com/avatar/8081b26e05bb4354f7d65ffc34cbbd67?s=160&#038;d=retro&#038;r=pg  2x' class='avatar avatar-80 photo' height='80' width='80' /></noscript> </a>
              <svg class="half-circle" width="80px" height="80px">
                <use xlink:href="#half-circle"></use>
              </svg>
            </div>
            <div class="author-name-area">
              <div class="author-name-prefix">
                Author
              </div>
              <a class="author-name" href="https://css-tricks.com/author/chriscoyier/">
                Chris Coyier </a>
            </div>
          </div>
          <div class="tags">
            <a href="https://css-tricks.com/tag/svg/" rel="tag">SVG</a> <a href="https://css-tricks.com/tag/svg-animation/" rel="tag">SVG animation</a> </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>/*! CSS Used from: https://css-tricks.com/wp-content/themes/CSS-Tricks-17/style.css?cache_bust=1580767355603 */
@media screen and (prefers-reduced-motion:reduce){
  *{-webkit-transition:0s!important;transition:0s!important;}
}
*,:after,:before{box-sizing:border-box;}
a{text-decoration:none;}
article,header{display:block;}
img{border:0;-ms-interpolation-mode:bicubic;}
@media (prefers-reduced-motion:reduce){
  *{-webkit-animation-duration:.01ms!important;animation-duration:.01ms!important;-webkit-animation-iteration-count:1!important;animation-iteration-count:1!important;-webkit-transition-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important;}
}
a{color:#fff;}
a:not(.button):not(.commentPreviewButton):not(.comment-reply-link):focus,a:not(.button):not(.commentPreviewButton):not(.comment-reply-link):hover{background:-webkit-gradient(linear,left top,right top,from(#ff8a00),to(#e52e71));background:linear-gradient(90deg,#ff8a00,#e52e71);-webkit-background-clip:text;-webkit-text-fill-color:transparent;-webkit-box-decoration-break:clone;box-decoration-break:clone;text-shadow:none;}
h2{font-weight:900;margin:0 0 1.5rem;line-height:1;}
h2 a{color: whitesmoke;border:0;display:inline-block;}
h2 a:focus,h2 a:hover{color:#03a9f4;}
h2{font-family:Ringside Regular A,Ringside Regular B,Rubik,Lato,Lucida Grande,Lucida Sans Unicode,Tahoma,Sans-Serif;font-style:normal;font-size:2rem;letter-spacing:-.03rem;font-weight:400;}
@media (max-width:1200px){
  h2{font-size:1.8rem;}
}
@media (max-width:800px){
  h2{font-size:1.7rem;}
}
.h4{font-family:Ringside Regular A,Ringside Regular B,Rubik,Lato,Lucida Grande,Lucida Sans Unicode,Tahoma,Sans-Serif;font-style:normal;font-weight:700;font-size:1.5rem;margin:0 0 .8rem;}
@media (max-width:1200px){
  .h4{font-size:1.4rem;}
}
@media (max-width:800px){
  .h4{font-size:1.25rem;}
}
.h4{line-height:1.05;}
time{color:#7a7a8c;}
p{margin:0 0 1.5rem;}
.white-underline-links a{position:relative;font-weight:700;}
.white-underline-links a:after{content:"";height:2px;background:#fff;width:100%;position:absolute;bottom:-2px;left:0;border-radius:2px;}
.white-underline-links a:focus,.white-underline-links a:hover{color:inherit!important;-webkit-text-fill-color:inherit!important;}
.white-underline-links a:focus:after,.white-underline-links a:hover:after{-webkit-transform:translateY(1px);transform:translateY(1px);}
p:empty{display:none;}
.module{clear:both;margin:0 0 1rem;position:relative;}
.module>:last-child,.module>:last-child>:last-child{margin-bottom:0;}
img{height:auto!important;}
img{max-width:100%;}
.author-avatar{grid-area:avatar;align-self:start;position:relative;}
.author-avatar img{border-radius:50%;width:60px;height:60px!important;display:block;overflow:hidden;margin:16px 10px;-webkit-filter:grayscale(100%);filter:grayscale(100%);}
.author-avatar .half-circle{position:absolute;bottom:0;left:0;width:80px;height:56px;fill:none;stroke:url(https://css-tricks.com/wp-content/themes/CSS-Tricks-17/style.css?cache_bust=1580767355603#orange-to-pink);stroke-width:8;stroke-linecap:round;pointer-events:none;}
@media (max-width:800px){
  .author-avatar img{width:35px;height:35px!important;}
  .author-avatar .half-circle{width:55px;height:40px;}
}
.author-name-prefix{font-family:Ringside Regular A,Ringside Regular B,Rubik,Lato,Lucida Grande,Lucida Sans Unicode,Tahoma,Sans-Serif;font-style:normal;font-weight:700;color:#7a7a8c;}
.author-name-area{grid-area:author;}
.author-name,time{font-family:Sentinel SSm A,Sentinel SSm B,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;}
.tags{margin:1rem 0 2rem;padding:.5rem 0 1rem;line-height:2;}
@media (max-width:800px){
  .tags{margin:0;}
}
.tags a{color:#7a7a8c;text-transform:uppercase;font-size:.66rem;white-space:nowrap;border:3px solid #28242f;border-radius:2rem;padding:.2rem .85rem .25rem;}
.tags a:focus,.tags a:hover{color:#03a9f4;border-color:#fff;position:relative;}
.header-card{background-image:-webkit-gradient(linear,left bottom,left top,from(#ff8a00),to(#e52e71));background-image:linear-gradient(0deg,#ff8a00,#e52e71);position:relative;border-radius:16px;padding:2rem;margin:0 4rem 0 0;display:-webkit-box;display:flex;-webkit-box-pack:end;justify-content:flex-end;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:0;flex:0 0 320px;}
.header-card p{margin:0;font-size:.8rem;}
@media (max-width:1200px){
  .header-card{-webkit-writing-mode:vertical-rl;-ms-writing-mode:tb-rl;writing-mode:vertical-rl;-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-box-flex:0;flex:0;width:110px;margin-right:1rem;}
  .header-card a:after,.header-card br{display:none;}
}
.header-card-title{font-size:1.6rem;margin:0 0 .5rem;}
.popular-articles{box-sizing:content-box;display:-webkit-box;display:flex;width:calc(100vw - 71px);margin:0 0 5rem;padding:2rem 0;}
@media (max-width:1200px){
  .popular-articles{scrollbar-color:#201c29;scrollbar-width:10px;width:100%;padding-bottom:2rem;margin-bottom:6rem;overflow-x:scroll;-webkit-overflow-scrolling:touch;-ms-scroll-snap-points-x:repeat(250px);scroll-snap-points-x:repeat(250px);-ms-scroll-snap-type:mandatory;scroll-snap-type:mandatory;}
  .popular-articles::-webkit-scrollbar{width:10px;height:10px;}
  .popular-articles::-webkit-scrollbar-thumb{background:#201c29;border-radius:10px;box-shadow:inset 2px 2px 2px hsla(0,0%,100%,.25),inset -2px -2px 2px rgba(0,0,0,.25);}
  .popular-articles::-webkit-scrollbar-track{background:linear-gradient(90deg,#201c29,#201c29 1px,#17141d 0,#17141d);}
  .popular-articles .mini-card{scroll-snap-align:start;}
}
@media (max-width:1200px){
  .popular-articles{padding-left:0;}
}
.popular-header{margin:3rem 0;}
.header-card-sponsor{color:#ffb4b4;}
.mini-card-grid{scrollbar-color:#201c29;scrollbar-width:10px;scrollbar-gutter:always;padding:3rem;display:-webkit-box;display:flex;overflow-x:scroll;-webkit-overflow-scrolling:touch;}
.mini-card-grid::-webkit-scrollbar{width:10px;height:10px;}
.mini-card-grid::-webkit-scrollbar-thumb{background:#201c29;border-radius:10px;box-shadow:inset 2px 2px 2px hsla(0,0%,100%,.25),inset -2px -2px 2px rgba(0,0,0,.25);}
.mini-card-grid::-webkit-scrollbar-track{background:linear-gradient(90deg,#201c29,#201c29 1px,#17141d 0,#17141d);}
@media (max-width:1200px){
  .mini-card-grid{overflow-x:visible;}
}
.tags a{font-family:Ringside Regular A,Ringside Regular B,Rubik,Lato,Lucida Grande,Lucida Sans Unicode,Tahoma,Sans-Serif;font-style:normal;font-weight:700;font-size:.5rem;}
.mini-card{min-width:300px;min-height:350px;padding:1.5rem;border-radius:16px;background:#17141d;box-shadow:-1rem 0 3rem #000;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-transition:.2s;transition:.2s;margin:0;}
.mini-card h2{font-size:20px;margin:.25rem 0 auto;}
.mini-card:not(:first-child){margin-left:-130px;}
.mini-card:hover{-webkit-transform:translateY(-1rem);transform:translateY(-1rem);}
.mini-card:hover~.mini-card{-webkit-transform:translateX(130px);transform:translateX(130px);}
@media (max-width:1200px){
  .mini-card{min-width:220px;}
  .mini-card:not(:first-child){margin-left:-30px;}
  .mini-card:hover{-webkit-transform:translateY(-1rem);transform:translateY(-1rem);}
  .mini-card:hover~.mini-card{-webkit-transform:translateX(30px);transform:translateX(30px);}
}
@media (max-width:800px){
  .mini-card{min-width:190px;}
  .mini-card:not(:first-child){margin-left:-10px;}
  .mini-card:hover{-webkit-transform:translateY(-1rem);transform:translateY(-1rem);}
  .mini-card:hover~.mini-card{-webkit-transform:translateX(10px);transform:translateX(10px);}
}
.mini-article-subhead{font-size:14px;margin:0 0 1rem;}
.mini-article-card-header{margin-bottom:auto;}
.mini-article-meta{font-size:14px;}
.mini-article-meta .author-name{display:block;position:relative;}
.mini-article-meta .author-avatar img{width:40px;height:40px!important;}
.mini-article-meta .author-avatar .half-circle{width:60px;height:48px;}
.mini-article-byline{margin:3rem 0 0;display:grid;grid-template-columns:75px 1fr;-webkit-box-align:center;align-items:center;}
.mini-article-byline .author-avatar,.mini-article-byline .author-name-area{grid-area:auto;}
@media print{
  .tags,svg{display:none!important;}
  a,time{background:0 0!important;color:#000!important;}
}
</style>
