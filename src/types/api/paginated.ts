export type PaginatedResponse<T> = {
  page: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  totalItems: number;
  items: T[];
};
