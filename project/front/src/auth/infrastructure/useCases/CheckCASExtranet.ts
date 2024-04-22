import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";
import type { AxiosResponse } from "axios";

async function checkCASExtranetInMemory() {
  await UtilHelper.wait(500);
}

async function checkCASExtranetApi() {
  const response = await http.get<AxiosResponse>("login/extranet/cas");
  const { data } = response.data;
  return data;
}

async function checkCASExtranet() {
  return UtilHelper.checkEnvironment()
    ? await checkCASExtranetInMemory()
    : await checkCASExtranetApi();
}

export { checkCASExtranet };
