import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type { NumeroNotificaciones } from "@/shared/dominio/notificaciones/NumeroNotificaciones";
import Mock from "@/shared/infrastructure/mocks/notificaciones/getNumeroNotificacionesMock.json";
import type {
  ResponseData,
  ResponseNumeroNotificaciones,
} from "@/shared/infrastructure/models/notificaciones/ResponseGetNumeroNotificaciones";

async function InMemory(): Promise<ResponseNumeroNotificaciones> {
  await UtilHelper.wait(500);
  return Mock.data;
}

async function Api(): Promise<ResponseNumeroNotificaciones> {
  const response = await http.get<ResponseData>(`notificaciones/numero`);
  const { data } = response.data;
  return data;
}

async function getNumeroNotificaciones(): Promise<NumeroNotificaciones> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api();
  return createObject(data);
}

function createObject(item: ResponseNumeroNotificaciones): NumeroNotificaciones {
  return {
    numResultados: UtilUseCases.verifyValueNumber(item.numResultados),
  };
}

export { getNumeroNotificaciones };
