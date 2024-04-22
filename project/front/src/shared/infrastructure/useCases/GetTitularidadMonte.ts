import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type { TitularidadMonte } from "@/shared/dominio/TitularidadMonte";
import Mock from "@/shared/infrastructure/mocks/getTitularidadMonteMock.json";
import type {
  ResponseData,
  ResponseTitularidadMonte,
} from "@/shared/infrastructure/models/ResponseTitularidadMonte";

async function InMemory(): Promise<ResponseTitularidadMonte[]> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseTitularidadMonte[];
}

async function Api(): Promise<ResponseTitularidadMonte[]> {
  const response = await http.get<ResponseData>(`montepropiedade`);
  const { data } = response.data;
  return data;
}

async function getTitularidadMonte(): Promise<TitularidadMonte[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api();
  return createObject(data);
}

function createObject(items: ResponseTitularidadMonte[]): TitularidadMonte[] {
  return items.map((item) => {
    return {
      code: UtilUseCases.verifyValueNumber(item.code),
      title: UtilUseCases.verifyValueString(item.title),
    };
  });
}

export { getTitularidadMonte };
