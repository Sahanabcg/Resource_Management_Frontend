"use client";

import { useMemo } from "react";
import { buildSeries } from "@/lib/utils";
import qGraph from "@/data/resource-summary-graph-quarterly.json";
import qTable from "@/data/resource-summary-table-quarterly.json";
import { CommonTitle } from "../Components/CommonReportComponents";
import { CommonRecharts } from "./CommonRecharts";
import { CommonTable } from "./CommonTable";
import { CommonDeviationDescription } from "./CommonDeviationDescription";

export default function QuarterlyImpact() {
  const data = useMemo(
    () =>
      buildSeries(qGraph.data.labels, qGraph.data.targets, qGraph.data.actuals),
    []
  );

  return (
    <div className="space-y-2">
      <CommonTitle />
      <CommonRecharts data={data} highlight={{ x1: "Q1'23", x2: "Q2'23" }} />
      <CommonTable TableData={qTable} ImpactType="quarterly" />
      <CommonDeviationDescription />
    </div>
  );
}
