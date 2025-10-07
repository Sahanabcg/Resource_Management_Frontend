"use client";
import { useState } from "react";
import Sidebar from "./SideBar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar open={open} onToggle={() => setOpen((v) => !v)} />
      <main className="min-h-screen flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
