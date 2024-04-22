import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import Mock from "@/shared/infrastructure/mocks/postEmailSuxerencia.json";
import type {
  Params,
  ResponseData,
  ResponsePostEmailSuxerencia,
} from "@/shared/infrastructure/models/ResponsePostEmailSuxerencia";
import type { AxiosResponse } from "axios";

async function InMemory(): Promise<ResponsePostEmailSuxerencia> {
  await UtilHelper.wait(500);
  return Mock.data;
}

async function Api(suxerencia: string, email: string): Promise<ResponsePostEmailSuxerencia> {
  const response = await http.post<Params, AxiosResponse<ResponseData>>(`email/suxerencia`, {
    suxerencia: suxerencia,
    email: email,
  });
  const { data } = response.data;
  return data;
}

async function postEmailSuxerencia(suxerencia: string, email: string) {
  return UtilHelper.checkEnvironment() ? await InMemory() : await Api(suxerencia, email);
}

export { postEmailSuxerencia };
