import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import type { Provincias } from "@/shared/dominio/Provincias";
import Mock from "@/shared/infrastructure/mocks/provincias/getAllProvinciasMock.json";
import type {
  ResponseData,
  ResponseProvincias,
} from "@/shared/infrastructure/models/ResponseProvincias";

async function InMemory(): Promise<ResponseProvincias[]> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseProvincias[];
}

async function Api(ca: string): Promise<ResponseProvincias[]> {
  if (ca === "") {
    ca = "12";
  }
  const response = await http.get<ResponseData>(`provincias/${ca}`);
  const { data } = response.data;
  return data;
}

async function getProvincias(ca: string): Promise<Provincias[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api(ca);
  return createObject(data);
}

function createObject(items: ResponseProvincias[]): Provincias[] {
  return items.map((item) => {
    return {
      value: item.value,
      province: item.province,
    };
  });
}

export { getProvincias };
