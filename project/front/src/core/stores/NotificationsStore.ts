import type { Notificaciones } from "@/shared/dominio/notificaciones/Notificaciones";
import { getNotificaciones } from "@/shared/infrastructure/useCases/notificaciones/GetNotificaciones";
import { getNumeroNotificaciones } from "@/shared/infrastructure/useCases/notificaciones/GetNumeroNotificaciones";
import { putNotificacionesMarcarLidas } from "@/shared/infrastructure/useCases/notificaciones/PutNotificacionesMarcarLidas";
import { defineStore } from "pinia";
export const useNotifications = defineStore("notifications", {
  state: () => ({
    loadingNumeroNotificaciones: <boolean>false,
    loadingNotificaciones: <boolean>false,
    loadingMarcarLidas: <boolean>false,
    numeroNotificaciones: <number>0,
    notificaciones: <Notificaciones[]>[],
    waitSegundosNumNotificaciones: <number>60,
  }),
  actions: {
    async getNumeroNotificaciones(): Promise<void> {
      this.loadingNumeroNotificaciones = true;
      await getNumeroNotificaciones()
        .then((response) => {
          this.numeroNotificaciones = response.numResultados;
          this.loadingNumeroNotificaciones = false;
        })
        .catch(() => {
          this.loadingNumeroNotificaciones = false;
        });
    },

    async getNumeroNotificacionesBucle(): Promise<void> {
      this.getNumeroNotificaciones();
      // setInterval(() => {
      //   this.getNumeroNotificaciones();
      // }, this.waitSegundosNumNotificaciones * 1000);
    },

    async getNotificaciones(): Promise<void> {
      this.loadingNotificaciones = true;
      await getNotificaciones()
        .then((response) => {
          const notificacionesFormat = <Notificaciones[]>[];
          response.forEach((notificacion) => {
            let notificacionTipo = "";
            if (notificacion.codTipo === "PO") {
              notificacionTipo = "proxecto-ordenacion";
            } else if (notificacion.codTipo === "DSX") {
              notificacionTipo = "doc-simple-xestion";
            } else if (notificacion.codTipo === "DCX") {
              notificacionTipo = "doc-compartido-xestion";
            }
            notificacion.mensaxe = notificacion.mensaxe.replace(
              '<a href="/Arquivo/arquivos/',
              `<a href="/xorfor/${notificacionTipo}/archivos/`
            );
            notificacionesFormat.push(notificacion);
          });
          this.notificaciones = notificacionesFormat;
          this.loadingNotificaciones = false;
        })
        .catch(() => {
          this.loadingNotificaciones = false;
        });
    },

    async putNotificacionesMarcarLidas(): Promise<void> {
      this.loadingMarcarLidas = true;
      if (this.numeroNotificaciones > 0) {
        this.numeroNotificaciones = 0;

        const noLeidas = this.notificaciones
          .filter((element) => element.lida === "0")
          .map(function (element) {
            return element.id;
          });

        await putNotificacionesMarcarLidas({ ids: noLeidas })
          .then(() => {
            this.loadingMarcarLidas = false;
          })
          .catch(() => {
            this.loadingMarcarLidas = false;
          });
      }
    },
  },
});
