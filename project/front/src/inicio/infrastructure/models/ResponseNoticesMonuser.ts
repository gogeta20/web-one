export interface ResponseNoticesMonuser {
  app: string;
  date: string;
  enlace: string;
  htmlContent: string;
  textoGL: string;
  title: string;
  tituloGL: string;
  visibility: string;
}

export interface ResponseData {
  data: ResponseNoticesMonuser[];
  status: number;
  message: string;
}
