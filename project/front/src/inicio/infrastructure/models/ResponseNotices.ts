export interface ResponseNotices {
  aviso: string;
  codDistrito: string | null;
  codProvincia: string | null;
  codTramite: string | null;
  codTipo: string | null;
  dataInicio: string;
  date: string;
  id: number;
  idxf: number;
  tipoAviso: string;
  title: string;
  usuario: string | null;
}

export interface ResponseData {
  data: ResponseNotices[];
  status: number;
  message: string;
}
