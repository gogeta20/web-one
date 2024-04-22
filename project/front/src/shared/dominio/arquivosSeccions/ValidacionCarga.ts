export interface Validacion {
  id: number;
  tipoInstrumento: string;
  codPlano: string;
  validacion: string;
  orden: number;
  activa: string;
  activaSimpl: string;
}

export interface Documento {
  title: string;
  validations: Validacion[];
  order: number;
}

export interface ValidacionTitleDocumentos {
  title: string;
  documentos: Documento[];
}

export interface ValidacionCarga {
  po: ValidacionTitleDocumentos;
  dx: ValidacionTitleDocumentos;
  ams: ValidacionTitleDocumentos;
}

export const validacionTitleDocumentosInicial = {
  title: "",
  documentos: [],
};

export const validacionCargaInicial = {
  po: {
    title: "",
    documentos: [],
  },
  dx: {
    title: "",
    documentos: [],
  },
  ams: {
    title: "",
    documentos: [],
  },
};
