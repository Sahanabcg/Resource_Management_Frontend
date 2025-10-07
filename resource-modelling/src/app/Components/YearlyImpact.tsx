"use client";

import { useMemo } from "react";
import { buildSeries } from "@/lib/utils";
import yGraph from "@/data/resource-summary-graph-yearly.json";
import yTable from "@/data/resource-summary-table-yearly.json";
import { CommonTitle } from "../Components/CommonReportComponents";
import { CommonRecharts } from "./CommonRecharts";
import { CommonTable } from "./CommonTable";
import { CommonDeviationDescription } from "./CommonDeviationDescription";

export default function YearlyImpact() {
  const data = useMemo(
    () =>
      buildSeries(yGraph.data.labels, yGraph.data.targets, yGraph.data.actuals),
    []
  );
  return (
    <div className="space-y-2">
      <CommonTitle />
      <CommonRecharts data={data} highlight={{ x1: "2024", x2: "2025" }} />
      <CommonTable TableData={yTable} ImpactType="yearly" />
      <CommonDeviationDescription />
    </div>
  );
}
