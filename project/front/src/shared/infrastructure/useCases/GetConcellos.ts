import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type { Concellos } from "@/shared/dominio/Concellos";
import { provinciasInicial } from "@/shared/dominio/Provincias";
import Mock from "@/shared/infrastructure/mocks/getConcellosMock.json";
import type {
  ResponseConcellos,
  ResponseData,
} from "@/shared/infrastructure/models/ResponseConcellos";

async function InMemory(): Promise<ResponseConcellos[]> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseConcellos[];
}

async function Api(provincia: string): Promise<ResponseConcellos[]> {
  if (provincia === "") {
    provincia = "15";
  }
  const response = await http.get<ResponseData>(`concellos/provincia/${provincia}`);
  const { data } = response.data;
  return data;
}

async function getConcellos(provincia: string): Promise<Concellos[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api(provincia);
  return createObject(data);
}

function createObject(items: ResponseConcellos[]): Concellos[] {
  return items.map((item) => {
    return {
      value: UtilUseCases.verifyValueNumber(item.value),
      concello: UtilUseCases.verifyValueString(item.concello),
      codDistrito: UtilUseCases.verifyValueString(item.codDistrito),
      provincia: { ...provinciasInicial },
    };
  });
}

export { getConcellos };
