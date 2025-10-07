"use client";

import { useState, useMemo } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import driversJson from "@/data/core-drivers.json";
import { useHeaderYears } from "@/hooks/useHeaderYears";
import { DriverData, Quarter } from "@/types/resource";
type Props = {
  searchTerm: string;
  viewYearly: boolean;
  onEdit:(row:DriverData)=>void;
};

export default function TableView({ searchTerm, viewYearly,onEdit }: Props) {
  const drivers = driversJson as unknown as DriverData[];
  const {header} =useHeaderYears()

  const years = useMemo(() => {
    const future = Array.from(
      { length: header.number_of_years },
      (_, i) => header.base_year + 1 + i
    );
    return [header.base_year, ...future];
  }, [header]);

  const quarterCols = useMemo(() => {
    const start = header.base_year + 1;
    const end = header.base_year + header.number_of_years;
    const cols: { year: number; quarter: Quarter; label: string }[] = [];
    for (let y = start; y <= end; y++) {
      for (let q = 1 as Quarter; q <= 4; q = (q + 1) as Quarter) {
        cols.push({ year: y, quarter: q, label: `Q${q} ${y}` });
      }
    }
    return cols;
  }, [header]);

  const filtered = useMemo(() => {
    const s = searchTerm.trim().toLowerCase();
    if (!s) return drivers;
    return drivers.filter((d) =>
      d.core_driver?.name?.toLowerCase().includes(s)
    );
  }, [drivers, searchTerm]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const visible = filtered.slice(start, start + rowsPerPage);

  const baseYear = years[0];
  const getBaseVal = (d: DriverData) =>
    d.base_value?.value ??
    d.base_core_driver?.find(
      (x) =>
        x.year === baseYear && (x.quarter === null || x.quarter === undefined)
    )?.value ??
    "—";

  const getYearVal = (d: DriverData, y: number) =>
    d.yearly_core_drivers?.find((yy) => yy.year === y)?.value ?? "—";

  const getQuarterVal = (d: DriverData, y: number, q: number) =>
    d.quarterly_core_drivers?.find((e) => e.year === y && e.quarter === q)
      ?.value ?? "—";

  return (
    <div className="overflow-x-auto rounded-md border border-slate-200  bg-white mt-2">
      <div className="relative w-full max-w-full overflow-x-auto">
        <table
          className="table-fixed border-separate border-spacing-0 min-w-[1100px] w-full"
        >
          <thead className="sticky top-0 z-10 bg-gray-100">
            <tr className="text-left text-xs text-black-600">
              <th className="w-[30%] px-2 py-1 border border-gray-300 font-bold">
                DRIVERS
              </th>
              <th className="w-[14%] px-2 py-1 border border-gray-300 font-bold">
                UNIT OF MEASURE
              </th>
              <th
                className={`px-2 py-1 border border-gray-300 font-bold ${
                  viewYearly ? "" : "w-[14%]"
                }`}
              >
                {baseYear}
              </th>
              {viewYearly
                ? years.slice(1).map((year) => (
                    <th
                      key={year}
                      className="w-[8%] px-2 py-1 border border-gray-300 font-bold"
                    >
                      {year}
                    </th>
                  ))
                : quarterCols.map((c) => (
                    <th
                      key={`${c.year}-${c.quarter}`}
                      className="w-[8%] px-2 py-1 border border-gray-300 font-bold"
                    >
                      {c.label}
                    </th>
                  ))}
              <th
                className="sticky right-0 top-0 z-30 bg-gray-100
                     w-[110px] min-w-[110px] px-2 py-1
                     text-center border border-gray-300 font-bold whitespace-nowrap"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {visible.map((data) => (
              <tr key={data?.id} className="border-t">
                <td className="px-2 py-1 border border-gray-300">
                  {data?.core_driver?.name ?? "-"}
                </td>
                <td className="px-2 py-1 text-slate-500 border border-gray-300">
                  {data?.core_driver?.unit_name ?? "-"}
                </td>
                <td className="px-2 py-1 border border-gray-300">
                  {getBaseVal(data)}
                </td>
                {viewYearly
                  ? years.slice(1).map((year) => (
                      <td
                        key={`${data.id}-${year}`}
                        className="px-2 py-1 border border-gray-300"
                      >
                        {getYearVal(data, year)}
                      </td>
                    ))
                  : quarterCols.map((c) => (
                      <td
                        key={`${data.id}-${c.year}-${c.quarter}`}
                        className="px-2 py-1 border border-gray-300"
                      >
                        {getQuarterVal(data, c.year, c.quarter)}
                      </td>
                    ))}

                <td
                  className="sticky right-0 z-20 bg-white
                       w-[110px] min-w-[110px] px-2 py-1
                       border border-gray-300 whitespace-nowrap"
                >
                  <button
                    className="inline-flex items-center gap-1  px-2 py-1 text-xs hover:bg-slate-50"
                    onClick={() => onEdit(data)}
                  >
                    <SquarePen size={14} />
                  </button>
                  <button
                    className="ml-2 inline-flex items-center gap-1 px-2 py-1 text-xs hover:bg-slate-50"
                    onClick={() => alert(`Delete ${data.core_driver?.name}`)}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={years.length + 3}
                  className="px-6 py-6 text-center text-slate-500"
                >
                  No drivers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2 border-t px-2 py-1 text-sm">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="rounded border px-2 py-1 disabled:opacity-50"
          disabled={page === 1}
        >
          &lt;
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`h-7 w-7 rounded border ${
              page === p
                ? "border-emerald-500 text-emerald-700"
                : "hover:bg-slate-50"
            }`}
            aria-current={page === p ? "page" : undefined}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(pages, p + 1))}
          className="rounded border px-2 py-1 disabled:opacity-50"
          disabled={page === pages}
        >
          &gt;
        </button>

        <div className="ml-3">
          <select
            className="rounded border border-slate-300 font-bold px-2 py-1"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            aria-label="Rows per page"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
