import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type { Titulacion } from "@/shared/dominio/Titulacion";
import Mock from "@/shared/infrastructure/mocks/getTitulacionMock.json";
import type {
  ResponseTitulacion,
  ResponseData,
} from "@/shared/infrastructure/models/ResponseTitulacion";

async function InMemory(): Promise<ResponseTitulacion[]> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseTitulacion[];
}

async function Api(): Promise<ResponseTitulacion[]> {
  const response = await http.get<ResponseData>(`instrumentos/titulacions`);
  const { data } = response.data;
  return data;
}

async function getTitulacion(): Promise<Titulacion[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api();
  return createObject(data);
}

function createObject(items: ResponseTitulacion[]): Titulacion[] {
  return items.map((item) => {
    return {
      idTitulacion: UtilUseCases.verifyValueNumber(item.idTitulacion),
      descricionEs: UtilUseCases.verifyValueString(item.descricionEs),
      descricionGl: UtilUseCases.verifyValueString(item.descricionGl),
      activo: UtilUseCases.verifyValueString(item.activo),
    };
  });
}

export { getTitulacion };
