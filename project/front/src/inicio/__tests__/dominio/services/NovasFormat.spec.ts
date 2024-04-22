import {
  dateResolve,
  format,
  formatSend,
  OkTextResolve,
} from "@/inicio/dominio/services/NovasFormat";
import { expect, test } from "vitest";

const date = new Date("12/21/2021");
const dateText = "21/12/2021";
const datos = {
  aviso: "",
  codDistrito: "",
  codProvincia: "",
  codTramite: "",
  dataInicio: "",
  date: date.toString(),
  id: 2,
  idxf: 2,
  tipoAviso: "",
  usuario: "",
  app: "",
  enlace: "",
  htmlContent: "htmlContent",
  textoGL: "",
  title: "",
  tituloGL: "",
  visibility: "",
};

test("OkTextResolve", () => {
  const responseFalse = OkTextResolve("test", datos);
  expect(responseFalse).toBeFalsy();

  const responseTrue = OkTextResolve("htmlContent", datos);
  expect(responseTrue).toBeTruthy();
});

test("format", () => {
  const response = format(date);
  expect(response).toBe(dateText);
});

test("dateResolve", () => {
  const responseDay = dateResolve(datos);
  expect(responseDay).toBe(dateText);

  const datosHoy = { ...datos };
  datosHoy.date = new Date().toString();
  const responseToday = dateResolve(datosHoy);
  expect(responseToday).toBe("Hoy");
});

test("formatSend", () => {
  const response = formatSend(date);
  expect(response).toBe("12/21/2021, 24:00:00");
});
