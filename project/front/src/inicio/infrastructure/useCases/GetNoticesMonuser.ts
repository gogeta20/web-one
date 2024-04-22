import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import type { NoticesMonuser } from "@/inicio/dominio/NoticesMonuser";
import noticesMonuserMock from "@/inicio/infrastructure/mocks/noticesMonuserMock.json";
import type {
  ResponseData,
  ResponseNoticesMonuser,
} from "@/inicio/infrastructure/models/ResponseNoticesMonuser";

async function getNoticesMonuserInMemory(): Promise<ResponseNoticesMonuser[]> {
  await UtilHelper.wait(500);
  return noticesMonuserMock.data as ResponseNoticesMonuser[];
}

async function getNoticesMonuserApi(): Promise<ResponseNoticesMonuser[]> {
  const response = await http.get<ResponseData>("novas");
  const { data } = response.data;
  return data;
}

async function getNoticesMonuser(): Promise<NoticesMonuser[]> {
  return UtilHelper.checkEnvironment()
    ? await getNoticesMonuserInMemory()
    : await getNoticesMonuserApi();
}

export { getNoticesMonuser };
