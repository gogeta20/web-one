export interface ResponseDatosContactoProvincia {
  provincia: string;
  telefono: string;
  email: string;
}

export interface ResponseDatosContactoProvincias {
  CORUÑA: ResponseDatosContactoProvincia;
  LUGO: ResponseDatosContactoProvincia;
  OURENSE: ResponseDatosContactoProvincia;
  PONTEVEDRA: ResponseDatosContactoProvincia;
}

export interface ResponseDatosContacto {
  datosContacto: ResponseDatosContactoProvincias;
}

export interface ResponseData {
  data: ResponseDatosContacto;
  message: string;
  status: number;
}
