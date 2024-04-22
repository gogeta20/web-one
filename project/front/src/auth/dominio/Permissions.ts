export type Permissions = { [key: string]: Permission };

export interface Permission {
  tipo: string;
  provincia: string;
  distrito: string;
  servizo: string;
}

export const permissionsDefault: Permissions = {};
