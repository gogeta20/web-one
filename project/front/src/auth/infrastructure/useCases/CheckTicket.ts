import { Usuario } from "@/auth/dominio/Usuario";
import userMock from "@/auth/infrastructure/mocks/userMock.json";
import type { ResponseDataUsuario } from "@/auth/infrastructure/models/ResponseDataUsuario";
import { http } from "@/core/config/network/Http";
import { UtilHelper } from "@/core/utilities/UtilHelper";

async function checkTicketInMemory(): Promise<ResponseDataUsuario> {
  await UtilHelper.wait(500);
  const response = userMock;
  return response as ResponseDataUsuario;
}

async function checkTicketApi(ticket: string): Promise<ResponseDataUsuario> {
  const response = await http.post<ResponseDataUsuario>(`login/intranet/cas/ticket/${ticket}`);
  return response.data;
}

async function checkTicket(ticket: string): Promise<Usuario> {
  const data = UtilHelper.checkEnvironment()
    ? await checkTicketInMemory()
    : await checkTicketApi(ticket);
  return new Usuario(data.nombre, true, data.usuario, data.token, data.permissions, data.tipoLogin);
}

export { checkTicket };
