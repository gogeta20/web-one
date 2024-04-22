import userMock from "@/auth/infrastructure/mocks/userMock.json";
import type { ResponseDataUsuario } from "@/auth/infrastructure/models/ResponseDataUsuario";
import { UtilHelper } from "@/core/utilities/UtilHelper";

async function environmentInMemory(): Promise<ResponseDataUsuario> {
  await UtilHelper.wait(500);
  return userMock;
}

async function environment() {
  return await environmentInMemory();
}

export { environment };
