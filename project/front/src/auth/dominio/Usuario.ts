import type { Permissions } from "@/auth/dominio/Permissions";

export class Usuario {
  readonly nombre: string;
  readonly isAuthenticated: boolean;
  readonly id: string;
  readonly token: string;
  readonly permissions: Permissions;
  readonly tipoLogin: string;

  constructor(
    nombre: string,
    isAuthenticated: boolean,
    id: string,
    token: string,
    permissions: Permissions,
    tipoLogin: string
  ) {
    this.nombre = nombre;
    this.isAuthenticated = isAuthenticated;
    this.id = id;
    this.token = token;
    this.permissions = permissions;
    this.tipoLogin = tipoLogin;
  }
}
