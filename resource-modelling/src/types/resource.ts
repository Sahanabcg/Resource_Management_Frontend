export type DriverData = {
  id: number;
  core_driver: { name: string; unit_name?: string };
  base_value?: { value?: number };
  base_core_driver?: { quarter: number | null; year: number; value: number }[];
  yearly_core_drivers?: { year: number; value: number }[];
  quarterly_core_drivers?: { quarter: number; year: number; value: number }[];
};

export type Timeline = "Quarterly" | "Yearly";
export type Quarter = 1 | 2 | 3 | 4;

export type SavePayload = {
  id?: number;
  core_driver: { name: string; unit_name: string };
  base_value: { year: number; value: number };
  timeline: Timeline;
  quarterly_core_drivers?: {
    year: number;
    quarter: Quarter;
    value: number;
  }[];
  yearly_core_drivers?: { year: number; value: number }[];
};

export type HeaderData = { base_year: number; number_of_years: number };

export type Header = {
  base_year: number;
  number_of_years: number;
  display_years: number;
};

export type TableRow = {
  id: number;
  function: string;
  [key: string]: number | string;
};

export type TableCol = {
  id: string;
  title: string;
  targetField: string;
  actualField: string;
};

export type SeriesPoint = {
  label: string;
  target: number | null;
  actual: number | null;
};

export type Highlight = { x1: string; x2?: string } | undefined;


export type FiltersQuarterly = {
  base_year_val: number;
  start_quarter?: number;
  end_quarter?: number;
  previous_quarter: number;
  current_quarter: number;
  next_quarter: number;
  previous_year: number;
  current_year: number;
  next_year: number;
  start_year: number;
  end_year: number;
  prediction_start_year: number;
  prediction_end_year: number;
};

export type FiltersYearly = {
  base_year_val: number;
  start_quarter?: number;
  end_quarter?: number;
  previous_quarter?: number;
  current_quarter?: number;
  next_quarter?: number;
  previous_year: number;
  current_year: number;
  next_year: number;
  start_year: number;
  end_year: number;
  prediction_start_year: number;
  prediction_end_year: number;
};

export type TableData = {
  data: TableRow[];
  filters: FiltersQuarterly | FiltersYearly;
};
