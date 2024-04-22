import { getDescargarArchivoByRuta } from "@/altaSolicitude/infrastructure/useCases/files/getDescargarArchivoByRuta";
import { useUsuarioStore } from "@/auth/store/usuarioStore";
import {
  arquivoSeccionInicial,
  arquivosSeccionInicial,
  type ArquivoSeccion,
  type ArquivosSeccion,
  type ArquivosSubseccion,
  type CartografiaSeccion,
} from "@/shared/dominio/arquivosSeccions/ArquivosSeccion";
import {
  datosContactoInicial,
  type DatosContacto,
} from "@/shared/dominio/arquivosSeccions/DatosContacto";
import {
  validacionCargaInicial,
  type ValidacionCarga,
} from "@/shared/dominio/arquivosSeccions/ValidacionCarga";
import { getArquivosSeccions } from "@/shared/infrastructure/useCases/GetArquivosSeccions";
import { getDatosContacto } from "@/shared/infrastructure/useCases/GetDatosContacto";
import { getValidacionsCarga } from "@/shared/infrastructure/useCases/GetValidacionsCarga";
import { postEmailSuxerencia } from "@/shared/infrastructure/useCases/PostEmailSuxerencia";
import { defineStore } from "pinia";
const usuarioStore = useUsuarioStore();

export const useAyudaStore = defineStore({
  id: "axuda",
  state: () => ({
    permisoEnviarSugerencias: <boolean>false,
    permisoVerSeccionValidacionPlanos: <boolean>false,
    showFormAyudaSugerencia: <boolean>false,
    loadingPostEmailSuxerencia: <boolean>false,
    loadingArquivosSeccionsAll: <boolean>false,
    loadingValidacionsCarga: <boolean>false,
    loadingDatosContacto: <boolean>false,
    loadingDescargarArquivoAxuda: <boolean>false,
    arquivosSeccion: {
      MANUAIS: <ArquivosSeccion>arquivosSeccionInicial,
      IMPORTACION_DATOS: <ArquivosSeccion>arquivosSeccionInicial,
      PLANOS_TIPO: <ArquivosSeccion>arquivosSeccionInicial,
    },
    arquivoValidacion: <ArquivoSeccion>arquivoSeccionInicial,
    rutaSubseccionArquivoValidacion: <string>"",
    validacionsCarga: <ValidacionCarga>validacionCargaInicial,
    datosContacto: <DatosContacto>datosContactoInicial,
    cartografiaSeccion: {
      CARTOGRAFIA_APOIO: <CartografiaSeccion[]>[],
    },
    message: "",
    pathp: "/axuda",
  }),
  actions: {
    comprobarPermisoEnviarSugerencias() {
      const exists = usuarioStore.getPermission("enviarSugerencias");
      this.permisoEnviarSugerencias = exists !== null && exists.tipo == "GAL";
    },

    comprobarPermisoVerSeccionValidacionPlanos() {
      const exists = usuarioStore.getPermission("verSeccionValidacionPlanos");
      this.permisoVerSeccionValidacionPlanos = exists !== null && exists.tipo == "GAL";
    },

    async getAllArquivosSeccions(): Promise<void> {
      this.loadingArquivosSeccionsAll = true;
      getArquivosSeccions("S", "")
        .then((response) => {
          if (response.length > 0) {
            response.forEach((arquivoSeccion) => {
              switch (arquivoSeccion.seccion) {
                case "MANUAIS":
                  this.arquivosSeccion.MANUAIS = this.formatManuais(arquivoSeccion);
                  break;
                case "IMPORTACION_DATOS":
                  this.arquivosSeccion.IMPORTACION_DATOS = arquivoSeccion;
                  break;
                case "PLANOS_TIPO":
                  this.arquivosSeccion.PLANOS_TIPO = arquivoSeccion;
                  break;
                case "CARTOGRAFIA_APOIO":
                  this.cartografiaSeccion.CARTOGRAFIA_APOIO =
                    this.formatCartografiaApoyo(arquivoSeccion);
                  break;
              }
            });
          }

          this.loadingArquivosSeccionsAll = false;
        })
        .catch(() => {
          this.loadingArquivosSeccionsAll = false;
        });
    },

    async getValidacionsCarga(): Promise<void> {
      this.loadingValidacionsCarga = true;
      getValidacionsCarga("S")
        .then((response) => {
          this.validacionsCarga = response;
          this.loadingValidacionsCarga = false;
        })
        .catch(() => {
          this.loadingValidacionsCarga = false;
        });
    },

    async getDatosContacto(): Promise<void> {
      this.loadingDatosContacto = true;
      getDatosContacto()
        .then((response) => {
          this.datosContacto = response;
          this.loadingDatosContacto = false;
        })
        .catch(() => {
          this.loadingDatosContacto = false;
        });
    },

    async getDescargarArchivoByRuta(rutaArquivo: string, nombreArquivo: string): Promise<void> {
      this.loadingDescargarArquivoAxuda = true;
      await getDescargarArchivoByRuta(rutaArquivo, nombreArquivo)
        .then((response) => {
          this.loadingDescargarArquivoAxuda = false;
          return response;
        })
        .catch(() => {
          this.loadingDescargarArquivoAxuda = false;
        });
    },

    async postEmailSuxerencia(suxerencia: string, email: string): Promise<void> {
      this.loadingPostEmailSuxerencia = true;
      await postEmailSuxerencia(suxerencia, email)
        .then(() => {
          this.loadingPostEmailSuxerencia = false;
        })
        .catch(() => {
          this.loadingPostEmailSuxerencia = false;
        });
    },

    formatCartografiaApoyo(seccion: ArquivosSeccion): CartografiaSeccion[] {
      const formatCartografia = <CartografiaSeccion[]>[];
      seccion.subsecciones.forEach((subseccion) => {
        subseccion.arquivos.forEach((arquivo) => {
          const cartografiaSeleccionada = formatCartografia.find(
            (t) => t.descricion === arquivo.seccion.descricion
          );
          if (cartografiaSeleccionada) {
            const subseccionSeleccionada = cartografiaSeleccionada.subsecciones.find(
              (t) => t.subseccion === subseccion.subseccion
            );
            if (subseccionSeleccionada) {
              subseccionSeleccionada.arquivos.push(arquivo);
            } else {
              cartografiaSeleccionada.subsecciones.push({
                subseccion: subseccion.subseccion,
                dataSubseccion: subseccion.dataSubseccion,
                arquivos: [arquivo],
              });
            }
          } else {
            formatCartografia.push({
              descricion: arquivo.seccion.descricion,
              subsecciones: [
                {
                  subseccion: subseccion.subseccion,
                  dataSubseccion: subseccion.dataSubseccion,
                  arquivos: [arquivo],
                },
              ],
            });
          }
        });
      });

      return formatCartografia;
    },

    formatManuais(arquivosSeccion: ArquivosSeccion): ArquivosSeccion {
      const formatSubseccion = <ArquivosSubseccion[]>[];

      arquivosSeccion.subsecciones.forEach((subseccion) => {
        if (
          typeof subseccion.dataSubseccion === "string" ||
          (typeof subseccion.dataSubseccion !== "string" &&
            subseccion.dataSubseccion.ruta !== "validacionsCargaPlanos/")
        ) {
          formatSubseccion.push(subseccion);
        } else {
          if (subseccion.arquivos.length > 0) {
            this.arquivoValidacion = subseccion.arquivos[0];

            if (
              typeof subseccion.dataSubseccion !== "string" &&
              subseccion.dataSubseccion.ruta !== null
            ) {
              this.rutaSubseccionArquivoValidacion = subseccion.dataSubseccion.ruta;
            }
          }
        }
      });
      arquivosSeccion.subsecciones = formatSubseccion;
      return arquivosSeccion;
    },
  },
});
