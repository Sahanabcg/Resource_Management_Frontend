"use client";
import SidebarLayout from "../Components/SidebarLayout";
import PageHeader from "../Components/PageHeader";
import ManageToolBar from "../Components/ManageToolBar";
import TableView from "../Components/TableView";
import { useState } from "react";
import CoreDriverActions from "../Components/CoreDriverActions";
import { DriverData } from "@/types/resource";

export default function ManageDataPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewYearly, setViewYearly] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingData, setEditingData] = useState<DriverData | null>(null);

  const openAdd = () => {
    setEditingData(null);
    setDrawerOpen(true);
  };
  const openEdit = (editingRow: DriverData) => {
    setEditingData(editingRow);
    setDrawerOpen(true);
  };

  return (
    <SidebarLayout>
      <div className="mx-auto px-6 py-4">
        <PageHeader
          left="Tool Management > Manage Site Data"
          right="Melbourne"
          className="mb-4"
        />
        <div className="py-4">
          <ManageToolBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewYearly={viewYearly}
            setViewYearly={setViewYearly}
            onAdd={openAdd}
          />
          <TableView
            searchTerm={searchTerm}
            viewYearly={viewYearly}
            onEdit={openEdit}
          />
        </div>
      </div>
      <CoreDriverActions
        open={drawerOpen}
        mode={editingData ? "edit" : "add"}
        initial={editingData ?? undefined}
        onClose={() => setDrawerOpen(false)}
        onSave={(payload) => {
          console.log("Save the data", payload);
          setDrawerOpen(false);
        }}
      />
    </SidebarLayout>
  );
}
