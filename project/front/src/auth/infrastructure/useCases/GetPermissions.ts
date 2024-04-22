import type { Permissions } from "@/auth/dominio/Permissions";
import permissionsExtranetMock from "@/auth/infrastructure/mocks/permissionsExtranetMock.json";
import permissionsMock from "@/auth/infrastructure/mocks/permissionsMock.json";
import type {
  ResponseData,
  ResponsePermissions,
} from "@/auth/infrastructure/models/ResponseGetPermissions";
import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";

async function getPermissionsInMemory(): Promise<Permissions> {
  await UtilHelper.wait(500);
  const response = selectPermissions();
  return response.data as Permissions;
}

async function getPermissionsApi(): Promise<ResponsePermissions> {
  const permissions = await http.post<ResponseData>(`permissions`);
  const { data } = permissions.data;
  return data;
}

async function getPermissions(): Promise<Permissions> {
  return UtilHelper.checkEnvironment() ? await getPermissionsInMemory() : await getPermissionsApi();
}

function selectPermissions() {
  if (import.meta.env.MODE === "extranet") {
    return permissionsExtranetMock;
  } else {
    return permissionsMock;
  }
}

export { getPermissions };
