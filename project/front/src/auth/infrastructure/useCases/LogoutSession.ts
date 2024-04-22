import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";

interface logout {
  login: string;
}

async function logoutSessionInMemory(): Promise<string> {
  await UtilHelper.wait(500);
  return "";
}

async function logoutSessionApi(param: string): Promise<string> {
  const response = await http.post<logout>(`login/finish`, { login: param });
  if (response.headers !== undefined) {
    const { cas } = response.headers;
    const { dominio } = response.headers;
    if (cas !== undefined && dominio != undefined) {
      const urlEncode: string = encodeURIComponent(dominio);
      const refCas: string = cas.replace("%s", "");
      return refCas.concat(urlEncode);
    }
    return "";
  }
  return "";
}

async function logoutSession(param: string): Promise<string> {
  const typeSession = param == "casIntranet" ? "intranet" : "extranet";
  return UtilHelper.checkEnvironment()
    ? await logoutSessionInMemory()
    : await logoutSessionApi(typeSession);
}

export { logoutSession };
