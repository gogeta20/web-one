import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import { UtilUseCases } from "@/core/utilities/UtilUseCases";
import type { Monte } from "@/shared/dominio/Monte";
import Mock from "@/shared/infrastructure/mocks/postMonteMock.json";
import type {
  Params,
  ResponseData,
  ResponseMonte,
} from "@/shared/infrastructure/models/ResponseMonte";
import type { AxiosResponse } from "axios";

async function InMemory(): Promise<ResponseMonte[]> {
  await UtilHelper.wait(500);
  return Mock.data as ResponseMonte[];
}

async function Api(params: Params): Promise<ResponseMonte[]> {
  const response = await http.post<Params, AxiosResponse<ResponseData>>(`monte`, params);
  const { data } = response.data;
  return data;
}

async function postMonte(params: Params): Promise<Monte[]> {
  const data = UtilHelper.checkEnvironment() ? await InMemory() : await Api(params);
  return createObject(data);
}

function createObject(items: ResponseMonte[]): Monte[] {
  return items.map((item) => {
    return {
      idMonte: UtilUseCases.verifyValueNumber(item.id),
      campoMonte: UtilUseCases.verifyValueString(item.campoMonte),
      nomemonte: UtilUseCases.verifyValueString(item.nomemonte),
      codProvincia: UtilUseCases.verifyValueNumber(item.codProvincia),
      codConcello: UtilUseCases.verifyValueNumber(item.codConcello),
      codpropiedade: UtilUseCases.verifyValueNumber(item.codpropiedade),
      nomeConcello: UtilUseCases.verifyValueString(item.nomeConcello),
    };
  });
}

export { postMonte };
