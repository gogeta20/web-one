export interface ResponseNotificaciones {
  id: number;
  titulo: string;
  mensaxe: string;
  lida: string | null;
  created: string | null;
  codTipo: string;
}

export interface ResponseData {
  data: ResponseNotificaciones[];
  message: string;
  status: number;
}
