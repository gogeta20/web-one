// import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
import { defineStore } from "pinia";
export const mainAppStore = defineStore("appStore", {
  state: () => {
    return {
      openSidebar: false,
      logoImage: false,
    };
  },
  actions: {
    switchSidebar(){
      this.openSidebar = !this.openSidebar;
    },
  },
  // persist: <PersistedStateOptions>{
  //   key: "#main",
  //   storage: window.sessionStorage,
  //   paths: ["mainApp"],
  //   overwrite: true,
  // },
});
