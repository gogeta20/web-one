import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import Mock from "@/shared/infrastructure/mocks/getDniValidoMock.json";
import type {
  ResponseData,
  ResponseDniValido,
} from "@/shared/infrastructure/models/ResponseDniValido";
import type { DniValido } from "@/shared/dominio/DniValido";

async function InMemory(): Promise<ResponseDniValido> {
  await UtilHelper.wait(500);
  return Mock.data;
}

async function Api(dni: string): Promise<DniValido> {
  const response = await http.get<ResponseData>(`dni/${dni}`);
  const { data } = response.data;
  return data;
}

async function getDniValido(dni: string) {
  return UtilHelper.checkEnvironment() ? await InMemory() : await Api(dni);
}

export { getDniValido };
