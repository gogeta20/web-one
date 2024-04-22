import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";

interface logout {
  login: string;
}

async function logoutInMemory(): Promise<string> {
  await UtilHelper.wait(500);
  return "";
}

async function logoutApi(typeLoggin: string): Promise<string> {
  const response = await http.post<logout>("logout", { login: typeLoggin });
  if (response.headers !== undefined) {
    const { dominio } = response.headers;
    if (dominio != undefined) {
      return dominio;
    }
    return "";
  }
  return "";
}

async function logout(typeLoggin: string): Promise<string> {
  return UtilHelper.checkEnvironment() ? await logoutInMemory() : await logoutApi(typeLoggin);
}

export { logout };
