export interface FieldData {
  A: string;
  B: string;
  C: string;
}

export interface FinancialRowData {
  label: string;
  data: FieldData;
  tooltip?: string;
}