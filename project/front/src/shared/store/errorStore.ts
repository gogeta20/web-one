import { defineStore } from "pinia";
import { StatusErrorCode } from "@/core/config/network/StatusCode";
export const useErrorStore = defineStore({
  id: "error",
  state: () => ({
    message: "",
    pathp: "/error",
    messageForCode: <any>{
      400: "core.notification.no-permiso-consulta",
      401: "core.notification.no-permiso-consulta",
      403: "core.notification.no-permiso-consulta",
      404: "core.notification.no-permiso-consulta",
      429: "core.notification.no-permiso-consulta",
      500: "core.notification.no-permiso-consulta",
    },
  }),
  actions: {
    isError(statusCode: number) {
      const numCodes = Object.values(StatusErrorCode);
      for (let i = 0; i < numCodes.length; i++) {
        if (numCodes[i] == statusCode) {
          return true;
        }
      }
      return false;
    },
    getPath() {
      return this.pathp;
    },
    configError(statusCode: number) {
      this.message = this.messageForCode[statusCode];
    },
  },
});
