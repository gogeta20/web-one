import type { Permission } from "@/auth/dominio/Permissions";
import type { InicioFilters } from "@/inicio/dominio/InicioFilters";
import type { Notices } from "@/inicio/dominio/Notices";
import type { NoticesAll } from "@/inicio/dominio/NoticesAll";
import type { NoticesMonuser } from "@/inicio/dominio/NoticesMonuser";
import type { NoticeToShow } from "@/inicio/dominio/NoticeToShow";
import { dateResolve, OkTextResolve } from "@/inicio/dominio/services/NovasFormat";
import { isAviso, isEmptyResponse, isNotice } from "@/inicio/dominio/services/NovasServices";
import { getNotices } from "@/inicio/infrastructure/useCases/GetNotices";
import { getNoticesMonuser } from "@/inicio/infrastructure/useCases/GetNoticesMonuser";
import { defineStore } from "pinia";

export const useNovasStore = defineStore("novasStore", {
  state: () => {
    return {
      novas: <NoticesMonuser[]>[],
      avisos: <Notices[]>[],
      filters: <InicioFilters>{},
      allSort: <NoticeToShow[]>[],
      language: "gl",
      timeUpdateNovas: new Date(),
    };
  },
  actions: {
    async novasMonusrStore() {
      this.novas = await getNoticesMonuser();
    },
    async avisosStore($filters: InicioFilters, $permission: Permission | null, $language: string) {
      this.avisos = [];
      this.avisos = await getNotices($filters);
      this.language = $language;
      this.filters = $filters;
      await this.order($permission);
    },
    async order($permission: Permission | null) {
      const novasTransmuted = this.transmuteNotices(this.novas);
      const avisosTransmuted = this.transmuteNotices(this.avisos);
      const union = novasTransmuted.concat(avisosTransmuted);
      union.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
      union.reverse();
      this.allSort = this.mapDatos(union, $permission);
    },
    transmuteNotices(notices: Partial<NoticesAll>[]) {
      const result: NoticesAll[] = [];
      if (notices.length !== 0) {
        notices.forEach((notice) => {
          result.push({
            aviso: notice.aviso ? notice.aviso : "",
            codDistrito: notice.codDistrito !== undefined ? notice.codDistrito : "",
            codProvincia: notice.codProvincia !== undefined ? notice.codProvincia : "",
            codTramite: notice.codTramite !== undefined ? notice.codTramite : "",
            dataInicio: notice.dataInicio !== undefined ? notice.dataInicio : "",
            date: notice.date !== undefined ? notice.date : "",
            id: notice.id !== undefined ? notice.id : -1,
            idxf: notice.idxf !== undefined ? notice.idxf : -1,
            tipoAviso: notice.tipoAviso !== undefined ? notice.tipoAviso : "",
            usuario: notice.usuario !== undefined ? notice.usuario : "",
            app: notice.app !== undefined ? notice.app : "customUndefined",
            enlace: notice.enlace !== undefined ? notice.enlace : "",
            htmlContent: notice.htmlContent !== undefined ? notice.htmlContent : "",
            textoGL: notice.textoGL !== undefined ? notice.textoGL : "",
            title: notice.title !== undefined ? notice.title : "",
            tituloGL: notice.tituloGL !== undefined ? notice.tituloGL : "",
            visibility: notice.visibility !== undefined ? notice.visibility : "",
            codTipo: notice.codTipo !== undefined ? notice.codTipo : "",
          });
        });
      }
      return result;
    },
    mapDatos(union: NoticesAll[], $permission: Permission | null) {
      const f1 = new Date(this.filters.timeCustomIniJs); // + "- 200"
      const f2 = new Date(this.filters.timeCustomEndJs);
      const texto = this.filters.text;
      const result: NoticeToShow[] = [];
      union.forEach((item) => {
        const okText = OkTextResolve(texto, item);
        const dateCurrent = new Date(item.date);
        const mayorIgualFiltroIni = dateCurrent.getTime() >= f1.getTime();
        const menorIgualFiltroFin = dateCurrent.getTime() <= f2.getTime();
        if (mayorIgualFiltroIni && menorIgualFiltroFin && okText) {
          const newDate = dateResolve(item);
          if (item.app !== "customUndefined") {
            result.push(isNotice(item, newDate, $permission, this.language));
          } else {
            result.push(isAviso(item, newDate, this.filters.state));
          }
        }
      });
      return result;
    },
    getAllStore() {
      let $resultados: NoticeToShow[] = this.allSort.filter((item) => item);
      if ($resultados.length < 1) {
        $resultados = isEmptyResponse(this.language);
      }
      return $resultados;
    },
    compareFilters(newFilters: InicioFilters) {
      const oldFilters = { ...this.filters };

      return (
        Object.keys(newFilters).length === Object.keys(oldFilters).length &&
        (Object.keys(newFilters) as (keyof typeof newFilters)[]).every((key) => {
          return (
            Object.prototype.hasOwnProperty.call(oldFilters, key) &&
            newFilters[key] === oldFilters[key]
          );
        })
      );
    },
  },
});
