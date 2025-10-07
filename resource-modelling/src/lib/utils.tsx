import type {
  TableCol,
  FiltersQuarterly,
  FiltersYearly,
  SeriesPoint,
} from "@/types/resource";

export function buildSeries(
  labels: Array<string | number>,
  targets: Array<number | null | undefined>,
  actuals: Array<number | null | undefined>,
  opts?: { fallbackLabel?: (i: number) => string }
): SeriesPoint[] {
  const maximum_count = Math.max(
    labels?.length ?? 0,
    targets?.length ?? 0,
    actuals?.length ?? 0
  );
  const fallback = opts?.fallbackLabel ?? (() => "");

  const toLabel = (v: string | number | undefined, i: number) =>
    v === undefined ? fallback(i) : String(v);

  const out: SeriesPoint[] = [];
  for (let i = 0; i < maximum_count; i++) {
    out.push({
      label: toLabel(labels[i], i),
      target: targets[i] ?? null,
      actual: actuals[i] ?? null,
    });
  }
  return out;
}

export const percentDeviation = (target: number, actual: number) =>
  target ? ((actual - target) / target) * 100 : 0;

export const displayDeviation = (target: number, actual: number) => {
  if (actual === 0 || target === 0) return 0;
  return percentDeviation(target, actual);
};

export const deviationClass = (value: number) => {
  const abs = Math.abs(value);
  if (abs === 0) return "bg-emerald-500 text-white";
  if (abs <= 20) return "bg-yellow-400 text-white";
  if (abs <= 50) return "bg-pink-600 text-white";
  return "bg-red-600 text-white";
};

export const qKey = (q: number, y: number, kind: "target" | "actuals") =>
  `Q${q}_${y}_${kind}`;

export function buildQuarterCols(f: FiltersQuarterly): TableCol[] {
  const cols = [
    {
      title: `Previous Quarter Q${f.previous_quarter}'${String(
        f.previous_year
      ).slice(-2)}`,
      q: f.previous_quarter,
      y: f.previous_year,
    },
    {
      title: `Current Quarter Q${f.current_quarter}'${String(
        f.current_year
      ).slice(-2)}`,
      q: f.current_quarter,
      y: f.current_year,
    },
    {
      title: `Next Quarter Q${f.next_quarter}'${String(f.next_year).slice(-2)}`,
      q: f.next_quarter,
      y: f.next_year,
    },
  ];

  return cols.map((col, idx) => ({
    id: `q-${idx}-${col.q}-${col.y}`,
    title: col.title,
    targetField: qKey(col.q, col.y, "target"),
    actualField: qKey(col.q, col.y, "actuals"),
  }));
}

export function buildYearCols(f: FiltersYearly): TableCol[] {
  const cols: { y: number; title: string }[] = [
    { y: f.previous_year, title: `Previous Year ${f.previous_year}` },
    { y: f.current_year, title: `Current Year ${f.current_year}` },
    { y: f.next_year, title: `Next Year ${f.next_year}` },
  ];

  for (let y = f.next_year + 1; y <= f.end_year; y++) {
    cols.push({ y, title: String(y) });
  }

  return cols.map(({ y, title }, i) => ({
    id: `y-${y}-${i}`,
    title,
    targetField: `${y}_target`,
    actualField: `${y}_actuals`,
  }));
}
