export interface Params {
  ids: number[];
}

export interface ResponseNotificacionesMarcarLidas {
  idNotificacion: number;
  message: string;
}

export interface ResponseData {
  data: ResponseNotificacionesMarcarLidas[];
  message: string;
  status: number;
}
