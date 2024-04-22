import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import type { ResponseCheckedNotice } from "@/inicio/infrastructure/models/ResponseCheckedNotice";
import type { AxiosResponse } from "axios";

interface filtersCheckAviso {
  idAviso: string;
}

async function checkAvisoInMemory(): Promise<ResponseCheckedNotice[]> {
  await UtilHelper.wait(500);
  return [{ idAvisoLeido: 2901 }];
}

async function checkAvisoApi(idAviso: string): Promise<ResponseCheckedNotice[]> {
  const filters = {
    idAviso: idAviso,
  };
  const response = await http.post<filtersCheckAviso, AxiosResponse<ResponseCheckedNotice[]>>(
    "marcar_avisos_leidos",
    filters
  );
  return response.data;
}

async function checkAviso(idAviso: string): Promise<ResponseCheckedNotice[]> {
  return UtilHelper.checkEnvironment() ? await checkAvisoInMemory() : await checkAvisoApi(idAviso);
}

export { checkAviso };
