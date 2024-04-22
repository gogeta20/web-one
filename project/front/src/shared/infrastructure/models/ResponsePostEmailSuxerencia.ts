export interface ResponsePostEmailSuxerencia {
  message: string;
}

export interface ResponseData {
  data: ResponsePostEmailSuxerencia;
  message: string;
  status: number;
}

export interface Params {
  suxerencia: string;
  email: string;
}
