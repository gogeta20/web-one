import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import type { InicioFilters } from "@/inicio/dominio/InicioFilters";
import type { Notices } from "@/inicio/dominio/Notices";
import noticesMock from "@/inicio/infrastructure/mocks/noticesMock.json";
import type { ResponseData, ResponseNotices } from "@/inicio/infrastructure/models/ResponseNotices";
import type { AxiosResponse } from "axios";

async function getNoticesInMemory(): Promise<ResponseNotices[]> {
  await UtilHelper.wait(500);
  return noticesMock.data as ResponseNotices[];
}

async function getNoticesApi(filters: InicioFilters): Promise<ResponseNotices[]> {
  const response = await http.post<InicioFilters, AxiosResponse<ResponseData>>(
    "avisos/all/",
    filters
  );
  const { data } = response.data;
  return data;
}

async function getNotices(filters: InicioFilters): Promise<Notices[]> {
  const data = UtilHelper.checkEnvironment()
    ? await getNoticesInMemory()
    : await getNoticesApi(filters);
  return createObject(data);
}

function createObject(items: ResponseNotices[]): Notices[] {
  return items.map((item) => {
    return {
      id: item.id,
      dataInicio: item.dataInicio,
      aviso: eliminarHref(item.aviso),
      codDistrito: item.codDistrito,
      codProvincia: item.codProvincia,
      codTipo: item.codTipo,
      tipoAviso: item.tipoAviso,
      usuario: item.usuario,
      codTramite: item.codTramite,
      idxf: item.idxf,
      title: eliminarHref(item.title),
      date: item.date,
    };
  });
}

function eliminarHref(texto: string) {
  const position = texto.search("<a href=");
  let part1 = "";
  if (position >= 1) {
    part1 = texto.substring(0, position);
  } else {
    part1 = texto;
  }
  return part1;
}
export { getNotices };
