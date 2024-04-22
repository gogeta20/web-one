export interface ResponseProvincias {
  value: number;
  province: string;
}

export interface ResponseData {
  data: ResponseProvincias[];
  message: string;
  status: number;
}
