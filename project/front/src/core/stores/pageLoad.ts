import { defineStore } from "pinia";
export const usePageLoadStore = defineStore("pageLoad", {
  state: () => ({
    loadingPage: false,
    text: "",
    loading: false,
  }),
  actions: {
    showPageLoad(message?: string) {
      this.sendMessage("");
      if (message) {
        this.text = message;
      }
      this.loadingPage = true;
    },
    hiddenPageLoad() {
      this.loadingPage = false;
    },
    hiddenLoadingBlock() {
      this.loading = false;
    },
    sendMessage(message: string) {
      this.text = message;
    },
  },
});
