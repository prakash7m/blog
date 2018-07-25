import { Column } from './data-grid.model';

export class DataGridClass<Row> {
    columns: Column[] = [];
    rows: Row[] = [];
    emptyText = 'No data found.';
    errorMessage: string;
}
