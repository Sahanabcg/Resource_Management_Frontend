"use client";

import { SquarePen, CirclePlus, Search, Plus } from "lucide-react";
type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  viewYearly: boolean;
  setViewYearly: React.Dispatch<React.SetStateAction<boolean>>;
  onAdd?:()=> void;
};
export default function ManageToolBar({
  searchTerm,
  setSearchTerm,
  viewYearly,
  setViewYearly,
  onAdd
}: Props) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-slate-700">Base Year:</span>
        <select className="rounded-md border border-slate-300 px-2 py-1 text-sm">
          <option>2022</option>
        </select>
      </label>

      <div className="flex items-center gap-1 text-sm text-slate-700">
        <span>Predicted Timelines:</span>
        <span className="font-bold">4 Years (2023, 2024, 2025, 2026)</span>
        <SquarePen size={14} />
        <CirclePlus size={14} />
      </div>

      <div className="grow" />

      <div className="flex items-center gap-2 text-sm">
        <span className={!viewYearly ? "text-slate-900" : "text-slate-500"}>
          Quarterly
        </span>
        <button
          onClick={() => setViewYearly((v) => !v)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            viewYearly ? "bg-emerald-600" : "bg-slate-300"
          }`}
          aria-label="Toggle view"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              viewYearly ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
        <span className={viewYearly ? "text-slate-900" : "text-slate-500"}>
          Yearly
        </span>
      </div>

      <div className="flex items-center border rounded-sm border-slate-200">
        <input
          placeholder="Search"
          className="w-52 px-2 py-1 text-sm outline-none  border border-slate-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={16} className="ml-auto opacity-60  w-6" />
      </div>
      <button
        className="inline-flex items-center gap-1 rounded-sm border border-slate-200 px-2 py-1 text-sm hover:cursor-pointer hover:bg-slate-50"
        onClick={() => setSearchTerm("")}
      >
        Clear Filter
      </button>

      <button className="inline-flex items-center gap-1 rounded-sm border border-slate-200 px-2 py-1 text-sm hover:bg-slate-50">
        Bulk Update
      </button>

      <button className="inline-flex items-center gap-1 rounded-sm bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700" onClick={onAdd}>
        <Plus size={16} /> Add Core Driver
      </button>
    </div>
  );
}
