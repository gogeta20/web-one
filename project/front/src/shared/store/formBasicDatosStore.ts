import type { Concellos } from "@/shared/dominio/Concellos";
import type { Provincias } from "@/shared/dominio/Provincias";
import type { Titulacion } from "@/shared/dominio/Titulacion";
import type { TitularidadMonte } from "@/shared/dominio/TitularidadMonte";
import type { Vias } from "@/shared/dominio/Vias";
import { getConcellos } from "@/shared/infrastructure/useCases/GetConcellos";
import { getProvincias } from "@/shared/infrastructure/useCases/GetProvincias";
import { getTitulacion } from "@/shared/infrastructure/useCases/GetTitulacion";
import { getTitularidadMonte } from "@/shared/infrastructure/useCases/GetTitularidadMonte";
import { getVias } from "@/shared/infrastructure/useCases/GetVias";
import { getDireccionesVentos } from "@/altaSolicitude/infrastructure/useCases/ventos/GetDireccionesVentos";
import { getEstaciones } from "@/altaSolicitude/infrastructure/useCases/estacion/GetEstaciones";
import { getEspecies } from "@/altaSolicitude/infrastructure/useCases/especies/GetEspecies";
import { defineStore } from "pinia";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
import { estacionInicial, type Estacion } from "@/altaSolicitude/dominio/Estacion";
export const useFormBasic = defineStore("formBasic", {
  state: () => ({
    vias: <Vias[]>[],
    titulacion: <Titulacion[]>[],
    titularidadMonte: <TitularidadMonte[]>[],
    comunidadAutonoma: "",
    provincias: <Provincias[]>[],
    galicia: <Provincias[]>[],
    concellos: <Concellos[]>[],
    estaciones: <Estacion[]>[],
    especies: [],
    direccionesVentos: [],
    provincesList: <any>{
      15: <Concellos[]>[],
      27: <Concellos[]>[],
      36: <Concellos[]>[],
      32: <Concellos[]>[],
    },
  }),
  actions: {
    getVias() {
      return this.vias;
    },
    getTitulaciones() {
      return this.titulacion;
    },
    getProvincias() {
      return this.provincias;
    },
    getConcellos() {
      return this.concellos;
    },
    getTituliridadMonte() {
      return this.titularidadMonte;
    },
    getEstaciones() {
      return this.estaciones;
    },
    setComunidadAutonoma(ca: string) {
      return (this.comunidadAutonoma = ca);
    },
    async searchVias() {
      if (this.vias.length == 0) {
        this.vias = await getVias();
      }
      return this.vias;
    },
    async searchTitulaciones() {
      if (this.titulacion.length == 0) {
        this.titulacion = await getTitulacion();
      }
      return this.titulacion;
    },
    async searchProvincias(ca: string) {
      this.provincias = await getProvincias(ca);
      return this.provincias;
    },
    async searchGalicia() {
      if (this.galicia.length == 0) {
        this.galicia = await getProvincias("12");
      }
      return this.galicia;
    },
    async searchConcellos(prov: string) {
      this.concellos = await getConcellos(prov);
      return await this.concellos;
    },
    async searchTitularidadMonte() {
      if (this.titularidadMonte.length == 0) {
        this.titularidadMonte = await getTitularidadMonte();
      }
      return this.titularidadMonte;
    },
    async searchEstaciones() {
      if (this.estaciones.length == 0) {
        this.estaciones = [
          {
            id: 0,
            nome: "-",
          },
        ];
        const theEstaciones = await getEstaciones();
        this.estaciones.push(...theEstaciones);
      }
      return this.estaciones;
    },
    async searchDireccionesVentos() {
      if (this.direccionesVentos.length == 0) {
        this.direccionesVentos = await getDireccionesVentos();
      }
      return this.direccionesVentos;
    },
    async searchEspecies() {
      if (this.especies.length == 0) {
        this.especies = await getEspecies();
      }
      return this.especies;
    },
    setListProvince(codeProvince: number, list: Concellos[]) {
      this.provincesList[codeProvince] = list;
    },
    existListProvince(codeProvince: number) {
      if (codeProvince === 0) return false;
      return this.provincesList[codeProvince].length < 2 ? false : true;
    },
    getListProvince(codeProvince: number) {
      return this.provincesList[codeProvince];
    },
    getDataProvince(codeProvince: number) {
      return this.provincias.find((item) => item.value == codeProvince);
    },
    getDataConcello(codConcello: number) {
      return this.concellos.find((item) => item.value == codConcello);
    },
    getDataTitularidadMonte(codPropiedad: number) {
      return this.titularidadMonte.find((item) => item.code == codPropiedad);
    },
    existEstacion(idestacion, estacion) {
      let found = this.estaciones.find((item) => item.id == Number.parseInt(idestacion));
      if (found == undefined) {
        estacionInicial.nome = estacion;
        found = estacionInicial;
      }
      return found;
    },
  },
  persist: <PersistedStateOptions>{
    key: "#formBasic",
    storage: window.sessionStorage,
    paths: ["provincias"],
    overwrite: true,
    // beforeRestore: (context) => {},
    // afterRestore: (context) => {},
  },
});
