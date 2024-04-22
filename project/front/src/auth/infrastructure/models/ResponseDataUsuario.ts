import type { Permissions } from "@/auth/dominio/Permissions";

export interface ResponseDataUsuario {
  usuario: string;
  nombre: string;
  token: string;
  permissions: Permissions;
  tipoLogin: string;
}
