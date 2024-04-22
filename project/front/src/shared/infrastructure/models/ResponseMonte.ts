export interface ResponseMonte {
  id: number;
  campoMonte: string;
  nomemonte: string;
  codProvincia: number;
  codConcello: number;
  codpropiedade: number;
  nomeConcello: string;
}

export interface ResponseData {
  data: ResponseMonte[];
  message: string;
  status: number;
}

export interface Params {
  idMonte: string;
  codPropiedade: string;
  codProvincia: string;
  codConcello: string;
}
