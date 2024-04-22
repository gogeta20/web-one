export interface InicioFilters {
  state: string;
  ambit: string;
  text: string;
  timeCustomIniJs: string | Date;
  timeCustomEndJs: string | Date;
  timeCustomIni: string;
  timeCustomEnd: string;
}

export const inicioFiltersDefault: InicioFilters = {
  state: "",
  ambit: "",
  text: "",
  timeCustomIniJs: "",
  timeCustomEndJs: "",
  timeCustomIni: "",
  timeCustomEnd: "",
};
