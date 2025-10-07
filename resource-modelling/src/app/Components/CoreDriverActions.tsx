"use client";
import * as React from "react";
import type {
  DriverData,
  Timeline,
  Quarter,
  SavePayload,
} from "@/types/resource";
import { useHeaderYears } from "@/hooks/useHeaderYears";

type Props = {
  open: boolean;
  mode: "add" | "edit";
  initial?: DriverData;
  onClose: () => void;
  onSave: (payload: SavePayload) => void;
  payload?: SavePayload;
};

export default function CoreDriverDrawer({
  open,
  mode,
  initial,
  onClose,
  onSave,
}: Props) {
  const { baseYear, futureYears } = useHeaderYears();

  const [name, setName] = React.useState("");
  const [unit, setUnit] = React.useState("#");
  const [baseValue, setBaseValue] = React.useState("");
  const [timeline, setTimeline] = React.useState<Timeline>("Quarterly");
  const [qVals, setQVals] = React.useState<
    Record<number, Partial<Record<Quarter, string>>>
  >({});
  const [yVals, setYVals] = React.useState<Record<number, string>>({});
  const isEdit = mode == "edit";

  React.useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initial) {
      setName(initial.core_driver?.name ?? "");
      setUnit(initial.core_driver?.unit_name ?? "#");

      const base =
        initial.base_value?.value ??
        initial.base_core_driver?.find(
          (x) =>
            x.year === baseYear &&
            (x.quarter === null || x.quarter === undefined)
        )?.value ??
        "";
      setBaseValue(base === "" ? "" : String(base));

      const hasQuarterly = (initial.quarterly_core_drivers?.length ?? 0) > 0;
      setTimeline(hasQuarterly ? "Quarterly" : "Yearly");

      const q: Record<number, Partial<Record<Quarter, string>>> = {};
      for (const r of initial.quarterly_core_drivers ?? []) {
        const quarter = r.quarter as Quarter;
        (q[r.year] ??= {})[quarter] = String(r.value);
      }
      setQVals(q);

      const y: Record<number, string> = {};
      (initial.yearly_core_drivers ?? []).forEach((r) => {
        y[r.year] = String(r.value);
      });
      setYVals(y);
    } else {
      setName("");
      setUnit("#");
      setBaseValue("");
      setTimeline("Quarterly");
      setQVals({});
      setYVals({});
    }
  }, [open, mode, initial, baseYear]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: WindowEventMap["keydown"]) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const disabled = !name.trim() || !unit.trim() || baseValue.trim() === "";

  const handleSave = () => {
    const payload: SavePayload = {
      id: initial?.id,
      core_driver: { name: name.trim(), unit_name: unit },
      base_value: { year: baseYear, value: Number(baseValue) || 0 },
      timeline,
    };

    if (timeline === "Quarterly") {
      const rows: SavePayload["quarterly_core_drivers"] = [];
      for (const y of futureYears) {
        for (const q of [1, 2, 3, 4] as const) {
          const v = qVals[y]?.[q];
          if (v !== undefined && v !== "") {
            rows.push({ year: y, quarter: q, value: Number(v) || 0 });
          }
        }
      }
      payload.quarterly_core_drivers = rows;
    } else {
      payload.yearly_core_drivers = futureYears
        .filter((y) => yVals[y] !== undefined && yVals[y] !== "")
        .map((y) => ({ year: y, value: Number(yVals[y]) || 0 }));
    }

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={mode === "edit" ? "Edit Core Driver" : "Add Core Driver"}
        className="absolute right-0 top-0 h-full w-[720px] max-w-[95vw] bg-white shadow-xl"
      >
        <div className="flex items-center justify-between bg-emerald-700 px-5 py-4 text-white">
          <h2 className="text-sm font-semibold">
            {mode === "edit" ? "Edit Core Driver" : "Add Core Driver"}
          </h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 hover:bg-white/10"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[calc(100vh-112px)] overflow-auto px-6 py-5">
          <label className="mb-3 block text-sm font-bold text-slate-700">
            Driver Name <span className="text-red-500">*</span>
            <input
              className={`mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm ${
                isEdit ? "bg-gray-200 text-gray-400 cursor-not-allowed" : ""
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={isEdit}
            />
          </label>

          <div className="max-h-[calc(100vh-112px)] overflow-auto">
            <label className="mb-3 block text-sm font-bold text-slate-700">
              Units of Measure <span className="text-red-500">*</span>
              <select
                className={`mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm ${
                  isEdit ? "bg-gray-200 text-gray-400  cursor-not-allowed" : ""
                }`}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                disabled={isEdit}
                aria-disabled={isEdit}
              >
                <option value="#">#</option>
                <option value="#, per annum">#, per annum</option>
                <option value="units">units</option>
              </select>
            </label>

            <label className="mb-3 block text-sm font-bold text-slate-700">
              Base Year Value <span className="text-red-500">*</span>
              <input
                type="number"
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                placeholder={`Set value for ${baseYear}`}
                value={baseValue}
                onChange={(e) => setBaseValue(e.target.value)}
              />
            </label>

            <label className="mb-3 block text-sm font-medium text-slate-700">
              Set Timeline <span className="text-red-500">*</span>
              <select
                className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value as Timeline)}
              >
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </label>
          </div>

          <div className="mt-5 rounded border border-slate-200">
            <table className="w-full border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="w-32 border border-slate-200 px-2 py-2 text-left font-semibold">
                    {timeline === "Quarterly" ? "Quarter" : "Value"}
                  </th>
                  {futureYears.map((y) => (
                    <th
                      key={y}
                      className="border border-slate-200 px-2 py-2 text-left font-semibold"
                    >
                      {y}
                    </th>
                  ))}
                </tr>
              </thead>

              {timeline === "Quarterly" ? (
                <tbody>
                  {[1, 2, 3, 4].map((q) => (
                    <tr key={q}>
                      <td className="border border-slate-200 px-2 py-2 font-medium">
                        Q{q}
                      </td>
                      {futureYears.map((y) => (
                        <td
                          key={`${y}-${q}`}
                          className="border border-slate-200 px-2 py-1"
                        >
                          <input
                            type="number"
                            className="w-full rounded border border-slate-300 px-2 py-1"
                            value={qVals[y]?.[q as Quarter] ?? ""}
                            onChange={(e) =>
                              setQVals((prev) => ({
                                ...prev,
                                [y]: {
                                  ...(prev[y] ?? {}),
                                  [q as Quarter]: e.target.value,
                                },
                              }))
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td className="border border-slate-200 px-2 py-2 font-medium">
                      Value
                    </td>
                    {futureYears.map((y) => (
                      <td key={y} className="border border-slate-200 px-2 py-1">
                        <input
                          type="number"
                          className="w-full rounded border border-slate-300 px-2 py-1"
                          value={yVals[y] ?? ""}
                          onChange={(e) =>
                            setYVals((p) => ({ ...p, [y]: e.target.value }))
                          }
                        />
                      </td>
                    ))}
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded border px-3 py-1.5 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={disabled}
            className="rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white enabled:hover:bg-emerald-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </aside>
    </div>
  );
}
