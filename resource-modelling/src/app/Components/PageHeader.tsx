"use client";
import { useState } from "react";

type Tab = { key: string; label: string };

export default function PageHeader({
  left,
  right,
  rightTabs,
  value,
  onChange,
  className = "",
}: {
  left: string;
  right?: string;
  rightTabs?: Tab[];
  value?: string;
  onChange?: (key: string) => void;
  className?: string;
}) {
  const [internal, setInternal] = useState(rightTabs?.[0]?.key);
  const active = value ?? internal;
  const set = (k: string) => {
    if (value === undefined) setInternal(k);
    onChange?.(k);
  };

  return (
    <div className={`flex items-end justify-between mx-2 my-4 ${className}`}>
      <div>
        <div className="text-sm font-bold text-slate-700">{left}</div>
        <div className="mt-2 h-1 w-8 rounded bg-emerald-500" />
      </div>
      <div>
        {rightTabs?.length ? (
          <div className="flex gap-6 border-b border-slate-200">
            {rightTabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => set(t.key)}
                className={`pb-2 text-sm ${
                  active === t.key
                    ? "border-b-2 border-emerald-500 font-semibold text-slate-900"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : right ? (
          <div className="relative pl-3 text-sm text-slate-600">
            {right}
            <span className="absolute right-0 -bottom-2 block h-0.5 w-10 rounded bg-emerald-400" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
