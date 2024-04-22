import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import type { AxiosResponse } from "axios";

async function checkCASInMemory() {
  await UtilHelper.wait(500);
}

async function checkCASApi() {
  const response = await http.get<AxiosResponse>("login/intranet/cas");
  const { data } = response.data;
  return data;
}

async function checkCAS() {
  return UtilHelper.checkEnvironment() ? await checkCASInMemory() : await checkCASApi();
}

export { checkCAS };
