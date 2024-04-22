import { defineStore } from "pinia";

export const useToastStore = defineStore({
  id: "toast",
  state: () => ({
    title: "",
    message: "",
    type: "",
    code: 200,
    life: 3000,
  }),

  actions: {
    onShowToast({
      title,
      message,
      type,
      code,
      life,
    }: {
      title: string;
      message: string;
      type: string;
      code: number;
      life: number;
    }) {
      this.title = title;
      this.message = message;
      this.type = type;
      this.code = code;
      this.life = life;
    },
  },
});
