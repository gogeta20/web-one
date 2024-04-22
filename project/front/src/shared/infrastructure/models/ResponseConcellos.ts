export interface ResponseConcellos {
  value: number;
  concello: string;
  codDistrito: string;
}

export interface ResponseData {
  data: ResponseConcellos[];
  message: string;
  status: number;
}
