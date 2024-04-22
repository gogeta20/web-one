export interface Notificaciones {
  id: number;
  titulo: string;
  mensaxe: string;
  lida: string | null;
  created: string | null;
  codTipo: string;
}

export const NotificacionesInicial = {
  id: 0,
  titulo: "",
  mensaxe: "",
  lida: "",
  created: "",
  codTipo: "",
};
