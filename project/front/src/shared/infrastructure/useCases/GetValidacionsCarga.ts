import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type {
  Documento,
  Validacion,
  ValidacionCarga,
  ValidacionTitleDocumentos,
} from "@/shared/dominio/arquivosSeccions/ValidacionCarga";
import Mock from "@/shared/infrastructure/mocks/arquivosSeccions/getValidacionsCargaMock.json";
import type {
  ResponseData,
  ResponseDocumento,
  ResponseValidacion,
  ResponseValidacionTitleDocumentos,
  ResponseValidacionsCarga,
} from "@/shared/infrastructure/models/arquivosSeccions/ResponseValidacionsCarga";

async function InMemory(): Promise<ResponseValidacionsCarga> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseValidacionsCarga;
}

async function Api(mostrarActivos: string): Promise<ResponseValidacionsCarga> {
  const param = JSON.stringify({
    mostrarActivos: mostrarActivos,
  });
  const response = await http.get<ResponseData>(`validacionsCarga`, {
    params: {
      parameters: param,
    },
  });
  const { data } = response.data;
  return data;
}

async function getValidacionsCarga(mostrarActivos: string): Promise<ValidacionCarga> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api(mostrarActivos);
  return createObject(data);
}

function createObject(item: ResponseValidacionsCarga): ValidacionCarga {
  return {
    po: createObjectValidacionItemDocumento(item.po),
    dx: createObjectValidacionItemDocumento(item.dx),
    ams: createObjectValidacionItemDocumento(item.ams),
  };
}

function createObjectValidacionItemDocumento(
  item: ResponseValidacionTitleDocumentos
): ValidacionTitleDocumentos {
  return {
    title: UtilUseCases.verifyValueString(item.title),
    documentos: createObjectDocumentos(item.documentos),
  };
}

function createObjectDocumentos(items: ResponseDocumento[]): Documento[] {
  return items.map((item) => {
    return {
      title: UtilUseCases.verifyValueString(item.title),
      validations: createObjectValidacions(item.validations),
      order: UtilUseCases.verifyValueNumber(item.order),
    };
  });
}

function createObjectValidacions(items: ResponseValidacion[]): Validacion[] {
  return items.map((item) => {
    return {
      id: UtilUseCases.verifyValueNumber(item.id),
      tipoInstrumento: UtilUseCases.verifyValueString(item.tipoInstrumento),
      codPlano: UtilUseCases.verifyValueString(item.codPlano),
      validacion: UtilUseCases.verifyValueString(item.validacion),
      orden: UtilUseCases.verifyValueNumber(item.orden),
      activa: UtilUseCases.verifyValueString(item.activa),
      activaSimpl: UtilUseCases.verifyValueString(item.activaSimpl),
    };
  });
}

export { getValidacionsCarga };
