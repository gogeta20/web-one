import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type { Notificaciones } from "@/shared/dominio/notificaciones/Notificaciones";
import Mock from "@/shared/infrastructure/mocks/notificaciones/getNotificacionesMock.json";
import type {
  ResponseData,
  ResponseNotificaciones,
} from "@/shared/infrastructure/models/notificaciones/ResponseGetNotificaciones";

async function InMemory(): Promise<ResponseNotificaciones[]> {
  await UtilHelper.wait(500);
  return Mock.data;
}

async function Api(): Promise<ResponseNotificaciones[]> {
  const response = await http.get<ResponseData>(`notificaciones`);
  const { data } = response.data;
  return data;
}

async function getNotificaciones(): Promise<Notificaciones[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api();
  return createObject(data);
}

function createObject(items: ResponseNotificaciones[]): Notificaciones[] {
  return items.map((item) => {
    return {
      id: UtilUseCases.verifyValueNumber(item.id),
      titulo: UtilUseCases.verifyValueString(item.titulo),
      mensaxe: UtilUseCases.verifyValueString(item.mensaxe),
      lida: UtilUseCases.verifyValueString(item.lida),
      created: UtilUseCases.verifyValueString(item.created),
      codTipo: UtilUseCases.verifyValueString(item.codTipo),
    };
  });
}

export { getNotificaciones };
