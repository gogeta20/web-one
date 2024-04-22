import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type { NotificacionesMarcarLidas } from "@/shared/dominio/notificaciones/NotificacionesMarcarLidas";
import Mock from "@/shared/infrastructure/mocks/notificaciones/putNotificacionesMarcarLidasMock.json";
import type {
  Params,
  ResponseData,
  ResponseNotificacionesMarcarLidas,
} from "@/shared/infrastructure/models/notificaciones/ResponsePutNotificacionesMarcarLidas";
import type { AxiosResponse } from "axios";

async function InMemory(): Promise<ResponseNotificacionesMarcarLidas[]> {
  await UtilHelper.wait(500);
  return Mock.data;
}

async function Api(params: Params): Promise<ResponseNotificacionesMarcarLidas[]> {
  const response = await http.put<Params, AxiosResponse<ResponseData>>(
    `notificaciones/marcar_lidas`,
    params
  );
  const { data } = response.data;
  return data;
}

async function putNotificacionesMarcarLidas(params: Params): Promise<NotificacionesMarcarLidas[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api(params);
  return createObject(data);
}

function createObject(items: ResponseNotificacionesMarcarLidas[]): NotificacionesMarcarLidas[] {
  return items.map((item) => {
    return {
      idNotificacion: UtilUseCases.verifyValueNumber(item.idNotificacion),
      message: UtilUseCases.verifyValueString(item.message),
    };
  });
}

export { putNotificacionesMarcarLidas };
