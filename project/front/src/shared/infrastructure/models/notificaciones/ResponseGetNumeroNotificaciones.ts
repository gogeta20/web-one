export interface ResponseNumeroNotificaciones {
  numResultados: number;
}

export interface ResponseData {
  data: ResponseNumeroNotificaciones;
  message: string;
  status: number;
}
