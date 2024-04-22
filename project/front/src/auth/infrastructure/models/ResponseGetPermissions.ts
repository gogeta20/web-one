export type ResponsePermissions = { [key: string]: ResponsePermission };

export interface ResponsePermission {
  tipo: string;
  provincia: string;
  distrito: string;
  servizo: string;
}

export interface ResponseData {
  data: ResponsePermissions;
  status: number;
  message: string;
}
