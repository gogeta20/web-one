export interface ResponseValidacion {
  id: number;
  tipoInstrumento: string;
  codPlano: string;
  validacion: string;
  orden: number;
  activa: string;
  activaSimpl: string;
}

export interface ResponseDocumento {
  title: string;
  validations: ResponseValidacion[];
  order: number;
}

export interface ResponseValidacionTitleDocumentos {
  title: string;
  documentos: ResponseDocumento[];
}

export interface ResponseValidacionsCarga {
  po: ResponseValidacionTitleDocumentos;
  dx: ResponseValidacionTitleDocumentos;
  ams: ResponseValidacionTitleDocumentos;
}

export interface ResponseData {
  data: ResponseValidacionsCarga;
  message: string;
  status: number;
}
