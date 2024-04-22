export interface ResponseTitularidadMonte{
  code: number;
  title: string;
}

export interface ResponseData {
  data: ResponseTitularidadMonte[];
  message: string;
  status: number;
}
