export const center = "body-instrumento text-center";
export const noCenter = "body-instrumento";
export const widthDefault = "";
export const widthCustom = "";
export const widthCustomNoCenter = "display: flex;border-bottom: 0;";
export const containerTableBase = "container-table-base";
export const containerTableBaseMinMax = "container-table-base minMax";
export const buttonEnable = "buttonEnable";
export const buttonDisable = "buttonDisable";
export const btnEdit = "p-button-rounded p-button-success p-button-text";
export const btnDelete = "p-button-rounded p-button-danger p-button-text";
export const btnView = "p-button-rounded p-button-success p-button-text ";
export const headerClass = "classHeaderCustom";
export const footerClass = "classFooterCustom";
export const headerClassWarning = "classHeaderCustomWarning";
export const classHeaderCustomWarningPredios = "classHeaderCustomWarningPredios";
export const iconSuccess = "p-button-rounded p-button-success p-button-text";
export const iconNone = "displayNone";
export const iconInfo = "p-button-rounded p-button-info p-button-text";
export const iconWarning = "p-button-rounded p-button-warning p-button-text";
export const iconDanger = "p-button-rounded p-button-danger p-button-text";
export function classFila() {
  return "fila-normal";
}
export function headerClassWarningResolve() {
  return headerClassWarning;
}

export function buttonEnableResolve() {
  return buttonEnable;
}

export function classIcons(sw: boolean) {
  if (sw) {
    return classHeaderCustomWarningPredios;
  }
  return headerClassWarning;
}

export function bodyClassCenterResolve(centrado: boolean) {
  if (centrado) {
    return center;
  } else {
    return noCenter;
  }
}

export function headerClassCenterResolve(centrado: boolean) {
  if (centrado) {
    return headerClass;
  } else {
    return "";
  }
}

export function footerResolve(footer: string | undefined) {
  if (typeof footer !== "undefined") {
    return footer;
  } else {
    return "";
  }
}

export function footerClassCenterResolve(footer: string | undefined, centrado: boolean) {
  if (typeof footer !== "undefined" && centrado) {
    return footerClass;
  } else {
    return "";
  }
}

export function headerClassCustomTableCenterResolve(centrado: boolean) {
  if (centrado) {
    return widthCustom;
  } else {
    return widthCustomNoCenter;
  }
}
