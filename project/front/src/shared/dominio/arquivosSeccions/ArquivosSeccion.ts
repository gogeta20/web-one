export interface DataSeccion {
  idseccion: number;
  codRecurso: string;
  descricion: string;
  ruta: string;
  activo: string;
}

export interface ArquivoSeccion {
  id: number;
  descricion: string;
  ruta: string;
  activo: string;
  dataModificacion: string;
  usuario: string;
  publico: string;
  activoSimpl: string;
  seccion: DataSeccion;
  existeArquivo: boolean;
  loadingDescarga: boolean;
}

export interface DataSubseccion {
  idsubseccion: number;
  descricion: string;
  ruta: string;
  activo: string;
  dataModificacion: string;
  usuario: string;
  permisoLectura: string;
}

export interface ArquivosSubseccion {
  subseccion: string;
  dataSubseccion: DataSubseccion | string;
  arquivos: ArquivoSeccion[];
}

export interface ArquivosSeccion {
  seccion: string;
  descricion: string;
  subsecciones: ArquivosSubseccion[];
}

export interface CartografiaSeccion {
  descricion: string;
  subsecciones: ArquivosSubseccion[];
}

export const arquivoSeccionInicial = {
  id: 0,
  descricion: "",
  ruta: "",
  activo: "",
  dataModificacion: "",
  usuario: "",
  publico: "",
  activoSimpl: "",
  seccion: {
    idseccion: 0,
    codRecurso: "",
    descricion: "",
    ruta: "",
    activo: "",
  },
  existeArquivo: false,
  loadingDescarga: false,
};

export const arquivosSeccionInicial = {
  seccion: "",
  descricion: "",
  subsecciones: [],
};

export const cartografiaSeccionInicial = {
  descricion: "",
  secciones: [],
};
