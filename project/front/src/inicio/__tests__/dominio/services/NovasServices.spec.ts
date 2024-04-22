import { isAviso, isEmptyResponse, isNotice } from "@/inicio/dominio/services/NovasServices";
import { expect, test } from "vitest";

const date = new Date("12/21/2021");
const datos = {
  aviso: "",
  codDistrito: "",
  codProvincia: "",
  codTramite: "",
  codTipo: "",
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

const permision = {
  tipo: "",
  provincia: "",
  distrito: "",
  servizo: "",
};

test("isNotice", () => {
  const responseToWait = {
    title: datos.title,
    date: "test",
    content: "htmlContent",
    background: "novasClass",
    icon: "bolt",
    type: false,
    mainContainer: "novaPublic",
    id: "",
    idxf: "",
    btn: false,
    codTipo: "",
  };
  const response = isNotice(datos, "test", permision, "es");
  expect(response).toStrictEqual(responseToWait);
});

test("isAviso", () => {
  const responseToWait = {
    title: datos.title,
    date: "test",
    content: "",
    background: "avisosClass",
    icon: "star",
    type: true,
    mainContainer: "avisosMain",
    id: "2",
    idxf: "2",
    btn: false,
    codTipo: "",
  };
  const response = isAviso(datos, "test", "state");
  expect(response).toStrictEqual(responseToWait);
});

test("isAviso - empty", () => {
  const responseToWait = [
    {
      title: "Sin Resultados",
      date: "",
      content: "",
      background: "sinResultClass",
      icon: "star",
      type: true,
      mainContainer: "avisosMain",
      id: "",
      idxf: "",
      btn: true,
      codTipo: "",
    },
  ];
  const response = isEmptyResponse("es");
  expect(response).toStrictEqual(responseToWait);
});
