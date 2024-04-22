import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";

interface login {
  user: string;
  pass: string;
  login: boolean;
}

async function loginUserInMemory(): Promise<void> {
  await UtilHelper.wait(500);
}

async function loginUserApi(username: string, password: string, login: boolean): Promise<void> {
  const buildSendData: login = {
    user: username,
    pass: password,
    login: login,
  };

  await http.post<login>("login/intranet/ldap", buildSendData);
}

async function loginUser(username: string, password: string, login: boolean): Promise<void> {
  try {
    const formatNombre = username.toLowerCase().trim();
    const formatPassword = password.trim();
    UtilHelper.checkEnvironment()
      ? await loginUserInMemory()
      : await loginUserApi(formatNombre, formatPassword, login);
  } finally {
    const base = UtilHelper.getBaseUrl();
    const ldap = "/ldap";
    window.location.assign(`${base}${ldap}`);
  }
}

export { loginUser };
