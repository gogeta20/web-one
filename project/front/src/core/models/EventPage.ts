/* eslint-disable @typescript-eslint/no-explicit-any */
// Modelo de datos de componente pagination de PRIMEVUE
export interface EventPage {
  originalEvent: OriginalEvent;
  first: number;
  rows: number;
  sortField: any;
  sortOrder: any;
  multiSortMeta: any[];
  sort: any;
  filters: any;
  pageCount: number;
  page: number;
}
interface OriginalEvent {
  page: number;
  first: number;
  rows: number;
  pageCount: number;
}
