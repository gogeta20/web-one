import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import Mock from "@/shared/infrastructure/mocks/getViasMock.json";
import type { ResponseData, ResponseVias } from "@/shared/infrastructure/models/ResponseVias";
import type { Vias } from "@/shared/dominio/Vias";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";

async function InMemory(): Promise<ResponseVias[]> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseVias[];
}

async function Api(): Promise<ResponseVias[]> {
  const response = await http.get<ResponseData>(`instrumentos/tiposvia`);
  const { data } = response.data;
  return data;
}

async function getVias(): Promise<Vias[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api();
  return createObject(data);
}

function createObject(items: ResponseVias[]): Vias[] {
  return items.map((item) => {
    return {
      idtipovia: UtilUseCases.verifyValueNumber(item.idTipovia),
      descricion: UtilUseCases.verifyValueString(item.descricion),
      activo: UtilUseCases.verifyValueString(item.activo),
    };
  });
}

export { getVias };
