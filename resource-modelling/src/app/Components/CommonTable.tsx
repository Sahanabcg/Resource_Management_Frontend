"use client";
import {
  TableData,
  TableRow,
  FiltersQuarterly,
  FiltersYearly,
} from "@/types/resource";
import { buildQuarterCols, displayDeviation, buildYearCols } from "@/lib/utils";
import DeviationBadge from "../Components/DeviationBadge";

type props = {
  ImpactType: "quarterly" | "yearly";
  TableData: TableData;
};
export const CommonTable = ({ TableData, ImpactType }: props) => {
  const cols =
    ImpactType == "quarterly"
      ? buildQuarterCols(TableData.filters as FiltersQuarterly)
      : buildYearCols(TableData.filters as FiltersYearly);

  return (
    <div className="overflow-auto rounded border border-slate-200 bg-white">
      <table className="min-w-[900px] w-full border-separate border-spacing-0 text-sm">
        <thead className="bg-slate-50 text-left">
          <tr>
            <th className="w-44 border border-slate-200 px-3 py-2">
              Functions
            </th>
            {cols.map((c) => (
              <th
                key={c.title}
                className="border border-slate-200 px-3 py-2 text-center"
              >
                {c.title}
              </th>
            ))}
          </tr>
          <tr>
            <th className="border border-slate-200 px-3 py-2" />
            {cols.map((c) => (
              <th
                key={c.title + "-sub"}
                className="border border-slate-200 p-0"
              >
                <div className="grid grid-cols-3 text-xs">
                  <span className="font-medium px-3 py-2 border-r border-slate-200">
                    Target FTE(s)
                  </span>
                  <span className="font-medium px-3 py-2 border-r border-slate-200">
                    Actuals FTE(s)
                  </span>
                  <span className="font-medium px-3 py-2">% Deviation</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TableData.data.map((row: TableRow) => (
            <tr key={row.id}>
              <td className="border border-slate-200 px-3 py-2">
                {row.function}
              </td>
              {cols.map((c) => {
                const t = Number(row[c.targetField] ?? 0);
                const a = Number(row[c.actualField] ?? 0);
                const dev = displayDeviation(t, a);
                return (
                  <td
                    key={row.id + c.title}
                    className="border border-slate-200 p-0"
                  >
                    <div className="grid grid-cols-3 items-center">
                      <span className="px-3 py-2 border-r border-slate-200">
                        {t}
                      </span>
                      <span className="px-3 py-2 border-r border-slate-200">
                        {a}
                      </span>
                      <div className="px-3 py-2">
                        <DeviationBadge value={dev} />
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
          <tr className="bg-slate-50 font-medium">
            <td className="border border-slate-200 px-3 py-2">Total</td>
            {cols.map((c) => {
              const tSum = TableData.data.reduce(
                (s, r) => s + Number(r[c.targetField] ?? 0),
                0
              );
              const aSum = TableData.data.reduce(
                (s, r) => s + Number(r[c.actualField] ?? 0),
                0
              );
              const dev = displayDeviation(tSum, aSum);
              return (
                <td
                  key={"total-" + c.title}
                  className="border border-slate-200 p-0"
                >
                  <div className="grid grid-cols-3 items-center">
                    <span className="px-3 py-2 border-r border-slate-200">
                      {tSum.toFixed(2)}
                    </span>
                    <span className="px-3 py-2 border-r border-slate-200">
                      {aSum.toFixed(2)}
                    </span>
                    <div className="px-3 py-2">
                      <DeviationBadge value={dev} />
                    </div>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
