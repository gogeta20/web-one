export interface ResponseDniValido {
  dni: boolean;
}

export interface ResponseData {
  data: ResponseDniValido;
  message: string;
  status: number;
}
