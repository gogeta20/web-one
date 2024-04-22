import { UtilDates } from "@/core/utilities/UtilDates";
import type { NoticesAll } from "@/inicio/dominio/NoticesAll";

function OkTextResolve(texto: string, datos: NoticesAll) {
  let okText = true;
  if (texto && datos.app !== "customUndefined") {
    okText = false;
    if (datos.htmlContent && datos.htmlContent.search(texto) !== -1) {
      okText = true;
    }
  }
  return okText;
}

function format(date: Date) {
  const locale = "es";
  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "numeric",
    year: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
}

function formatDate(value: string) {
  return UtilDates.formatDateMoment(value, "DD/MM/YYYY");
}

function parseToDate(date: string) {
  if (date !== "" && date !== "-") {
    const d = date.split("-");
    if (d.length == 3) {
      const dia = d[2].split(" ");
      const newDate = new Date(
        Number.parseInt(d[0]),
        Number.parseInt(d[1]) - 1,
        Number.parseInt(dia[0])
      );
      const locale = "es";
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
      };
      return new Intl.DateTimeFormat(locale, options).format(newDate);
    }
  }
  return "";
}
function parseToDateTable(date: string) {
  if (date !== "" && date !== "-") {
    const d = date.split("-");
    if (d.length == 3) {
      const dia = d[2].split(" ");
      const newDate = new Date(
        Number.parseInt(d[0]),
        Number.parseInt(d[1]) - 1,
        Number.parseInt(dia[0])
      );
      return newDate.toLocaleDateString("en-US");
    }
  }
  return "";
}

function dateResolve(datos: NoticesAll) {
  const now = format(new Date());
  const formatDate = format(new Date(datos.date));
  return now === formatDate ? "Hoy" : formatDate;
}

function formatSend(date: Date, endFilter = false) {
  const locale = "en";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  if (endFilter) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0);
  }
  return new Intl.DateTimeFormat(locale, options).format(date);
}

function dateToday() {
  return new Date();
}

function dateEdit($days: number) {
  const today = dateToday();
  const lastweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - $days);
  const lastDay = lastweek.getDate();
  const lastMonth = lastweek.getMonth();
  const lastYear = lastweek.getFullYear();
  return new Date(lastYear, lastMonth, lastDay);
}

function dateLimit($date: Date) {
  const lastweek = new Date($date.getFullYear(), $date.getMonth(), $date.getDate());
  const lastDay = lastweek.getDate();
  const lastMonth = lastweek.getMonth();
  const lastYear = lastweek.getFullYear();
  return new Date(lastYear, lastMonth, lastDay);
}

export {
  OkTextResolve,
  format,
  dateResolve,
  formatSend,
  dateToday,
  dateEdit,
  dateLimit,
  parseToDate,
  parseToDateTable,
  formatDate,
};
