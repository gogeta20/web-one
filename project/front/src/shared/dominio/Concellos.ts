import { provinciasInicial, type Provincias } from "@/shared/dominio/Provincias";

export interface Concellos {
  value: number;
  concello: string;
  codDistrito: string;
  provincia: Provincias;
}

export const concellosInicial = {
  value: 0,
  concello: "-",
  codDistrito: "",
  provincia: { ...provinciasInicial },
};
