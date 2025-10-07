"use client";
import { useState } from "react";
import PageHeader from "../Components/PageHeader";
import SidebarLayout from "../Components/SidebarLayout";
import QuarterlyImpact from "../Components/QuarterlyImpact";
import YearlyImpact from "../Components/YearlyImpact";

export default function ReportsPage() {
  const [tab, setTab] = useState<"quarterly" | "yearly">("quarterly");

  return (
    <>
      <SidebarLayout>
        <div className="mx-auto px-4 py-6">
          <PageHeader
            left="Reports > Summary Site View"
            rightTabs={[
              { key: "quarterly", label: "Quarterly Impact" },
              { key: "yearly", label: "Yearly Impact" },
            ]}
            value={tab}
            onChange={(k) => setTab(k as "quarterly" | "yearly")}
            className="mb-4"
          />

          {tab === "quarterly" ? <QuarterlyImpact /> : <YearlyImpact />}
        </div>
      </SidebarLayout>
    </>
  );
}
