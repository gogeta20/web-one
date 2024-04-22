import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type {
  ArquivoSeccion,
  ArquivosSeccion,
  ArquivosSubseccion,
  DataSeccion,
  DataSubseccion,
} from "@/shared/dominio/arquivosSeccions/ArquivosSeccion";
import Mock from "@/shared/infrastructure/mocks/arquivosSeccions/getArquivosSeccions.json";
import type {
  ResponseArquivoSeccion,
  ResponseArquivosSeccion,
  ResponseArquivosSubseccion,
  ResponseData,
  ResponseDataSeccion,
  ResponseDataSubseccion,
} from "@/shared/infrastructure/models/arquivosSeccions/ResponseArquivosSeccions";

async function InMemory(): Promise<ResponseArquivosSeccion[]> {
  await UtilHelper.wait(500);
  return Mock.data;
}

async function Api(
  mostrarActivos: string,
  filtrarApartado: string
): Promise<ResponseArquivosSeccion[]> {
  const param = JSON.stringify({
    mostrarActivos: mostrarActivos,
    filtrarApartado: filtrarApartado,
  });
  const response = await http.get<ResponseData>(`arquivosSeccions`, {
    params: {
      parameters: param,
    },
  });
  const { data } = response.data;
  return data;
}

async function getArquivosSeccions(
  mostrarActivos: string,
  filtrarApartado: string
): Promise<ArquivosSeccion[]> {
  const data = UtilHelper.checkEnvironment()
    ? await InMemory()
    : await Api(mostrarActivos, filtrarApartado);
  return createObject(data);
}

function createObject(items: ResponseArquivosSeccion[]): ArquivosSeccion[] {
  return items.map((item) => {
    return {
      seccion: UtilUseCases.verifyValueString(item.seccion),
      descricion: UtilUseCases.verifyValueString(item.descricion),
      subsecciones: createObjectSubsecciones(item.subsecciones),
    };
  });
}

function createObjectSubsecciones(items: ResponseArquivosSubseccion[]): ArquivosSubseccion[] {
  return items.map((itemSubseccion) => {
    return {
      subseccion: UtilUseCases.verifyValueString(itemSubseccion.subseccion),
      dataSubseccion:
        itemSubseccion.dataSubseccion === ""
          ? itemSubseccion.dataSubseccion
          : createObjectDataSubseccion(itemSubseccion.dataSubseccion),
      arquivos: createObjectArquivos(itemSubseccion.arquivos),
    };
  });
}

function createObjectDataSubseccion(item: ResponseDataSubseccion): DataSubseccion {
  return {
    idsubseccion: UtilUseCases.verifyValueNumber(item.idsubseccion),
    descricion: UtilUseCases.verifyValueString(item.descricion),
    ruta: UtilUseCases.verifyValueString(item.ruta),
    activo: UtilUseCases.verifyValueString(item.activo),
    dataModificacion: UtilUseCases.verifyValueString(item.dataModificacion),
    usuario: UtilUseCases.verifyValueString(item.usuario),
    permisoLectura: UtilUseCases.verifyValueString(item.permisoLectura),
  };
}

function createObjectArquivos(items: ResponseArquivoSeccion[]): ArquivoSeccion[] {
  return items.map((itemArquivo) => {
    return {
      id: UtilUseCases.verifyValueNumber(itemArquivo.id),
      descricion: UtilUseCases.verifyValueString(itemArquivo.descricion),
      ruta: UtilUseCases.verifyValueString(itemArquivo.ruta),
      activo: UtilUseCases.verifyValueString(itemArquivo.activo),
      dataModificacion: UtilUseCases.verifyValueString(itemArquivo.dataModificacion),
      usuario: UtilUseCases.verifyValueString(itemArquivo.usuario),
      publico: UtilUseCases.verifyValueString(itemArquivo.publico),
      activoSimpl: UtilUseCases.verifyValueString(itemArquivo.activoSimpl),
      seccion: createObjectDataSeccion(itemArquivo.seccion),
      existeArquivo: UtilUseCases.verifyValueBoolean(itemArquivo.existeArquivo),
      loadingDescarga: false,
    };
  });
}

function createObjectDataSeccion(item: ResponseDataSeccion): DataSeccion {
  return {
    idseccion: UtilUseCases.verifyValueNumber(item.idseccion),
    codRecurso: UtilUseCases.verifyValueString(item.codRecurso),
    descricion: UtilUseCases.verifyValueString(item.descricion),
    ruta: UtilUseCases.verifyValueString(item.ruta),
    activo: UtilUseCases.verifyValueString(item.activo),
  };
}

export { getArquivosSeccions };
