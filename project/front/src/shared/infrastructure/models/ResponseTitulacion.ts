export interface ResponseTitulacion {
  idTitulacion: number
  descricionEs: string;
  descricionGl: string;
  activo: string;
}

export interface ResponseData {
  data: ResponseTitulacion[];
  message: string;
  status: number;
}
