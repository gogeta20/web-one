/* eslint-disable @typescript-eslint/no-explicit-any */
// Modelo de respuesta de servicio de SPRING PAGINADO
export interface Pageable {
  sort: any;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface FiltersPage {
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
  page?: number;
}
