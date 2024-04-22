export interface ResponseVias {
  idTipovia: number;
  descricion: string;
  activo: string;
}

export interface ResponseData {
  data: ResponseVias[];
  message: string;
  status: number;
}
