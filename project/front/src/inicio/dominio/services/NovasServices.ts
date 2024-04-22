import type { Permission } from "@/auth/dominio/Permissions";
import type { NoticesAll } from "@/inicio/dominio/NoticesAll";
import type { NoticeToShow } from "@/inicio/dominio/NoticeToShow";

const PRIVATE = "novaPrivate";
const PUBLIC = "novaPublic";
const NOVAS_BACKGROUND = "novasClass";
const NOVAS_ICONS = "bolt";
const NOTICES_BACKGROUND = "avisosClass";
const EMPTY_BACKGROUND = "sinResultClass";
const NOTICES_MAIN = "avisosMain";
const NOTICES_ICON = "star";

function isNotice(
  datos: NoticesAll,
  newDate: string,
  $permission: Permission | null,
  language: string
): NoticeToShow {
  let mainContainer = "";
  let langText = "";
  if ($permission) {
    // intranet no publicas
    mainContainer = datos.visibility == "PUB" ? PRIVATE : PUBLIC;
  } else {
    // extranet no las privadas
    mainContainer = datos.visibility == "PRIV" ? PRIVATE : PUBLIC;
  }
  if (language == "gl") {
    langText = datos.textoGL;
  } else {
    langText = datos.htmlContent;
  }
  return {
    title: datos.title,
    date: newDate,
    content: langText,
    background: NOVAS_BACKGROUND,
    icon: NOVAS_ICONS,
    type: false,
    mainContainer: mainContainer,
    id: "",
    idxf: "",
    btn: false,
    codTipo: "",
  };
}

function isAviso(datos: NoticesAll, newDate: string, state: string): NoticeToShow {
  const myBtn: boolean = state == "lidas";
  return {
    title: datos.title,
    date: newDate,
    content: datos.aviso,
    background: NOTICES_BACKGROUND,
    icon: NOTICES_ICON,
    type: true,
    mainContainer: NOTICES_MAIN,
    id: datos.id ? datos.id.toString() : "",
    idxf: datos.idxf ? datos.idxf.toString() : "",
    btn: myBtn,
    codTipo: datos.codTipo,
  };
}

function isEmptyResponse(language: string) {
  const $title = language == "gl" ? "Sen Resultados" : "Sin Resultados";
  return [
    {
      title: $title,
      date: "",
      content: "",
      background: EMPTY_BACKGROUND,
      icon: NOTICES_ICON,
      type: true,
      mainContainer: NOTICES_MAIN,
      id: "",
      idxf: "",
      btn: true,
      codTipo: "",
    },
  ];
}
export { isAviso, isNotice, isEmptyResponse };
