export interface ResponseDataSeccion {
  idseccion: number;
  codRecurso: string;
  descricion: string;
  ruta: string;
  activo: string;
}

export interface ResponseArquivoSeccion {
  id: number;
  descricion: string;
  ruta: string;
  activo: string;
  dataModificacion: string;
  usuario: string;
  publico: string;
  activoSimpl: string;
  seccion: ResponseDataSeccion;
  existeArquivo: boolean;
}

export interface ResponseDataSubseccion {
  idsubseccion: number;
  descricion: string;
  ruta: string;
  activo: string;
  dataModificacion: string;
  usuario: string;
  permisoLectura: string;
}

export interface ResponseArquivosSubseccion {
  subseccion: string;
  dataSubseccion: ResponseDataSubseccion | string;
  arquivos: ResponseArquivoSeccion[];
}

export interface ResponseArquivosSeccion {
  seccion: string;
  descricion: string;
  subsecciones: ResponseArquivosSubseccion[];
}

export interface ResponseData {
  data: ResponseArquivosSeccion[];
  message: string;
  status: number;
}
