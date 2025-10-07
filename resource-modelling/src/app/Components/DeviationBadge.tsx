"use client";
import { deviationClass } from "@/lib/utils";

export default function DeviationBadge({ value }: { value: number }) {
  return (
    <span
      className={`rounded px-2 py-0.5 text-xs font-semibold ${deviationClass(
        value
      )}`}
    >
      {Number.isFinite(value) ? value.toFixed(2) : "0.00"}%
    </span>
  );
}
