export interface DataResponse<D> {
  data: D;
  message?: string;
}

export interface RowsResponse<R> {
  rows: R;
  message?: string;
}
