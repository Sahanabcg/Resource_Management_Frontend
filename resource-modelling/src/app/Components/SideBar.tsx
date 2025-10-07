"use client";

import Link from "next/link";
import { Home, BarChart3, Database, Settings, ChevronLeft } from "lucide-react";

type Props = { open: boolean; onToggle: () => void };

const NAV = [
  { href: "/", icon: <Home size={25} /> },
  { href: "/Reports", icon: <BarChart3 size={25} /> },
  { href: "/Manage_Data", icon: <Database size={25} /> },
  { href: "/Settings", icon: <Settings size={25} /> },
];

export default function Sidebar({ open, onToggle }: Props) {
  return (
    <aside
      className={`relative h-screen shrink-0 border-r bg-green-800 shadow-sm transition-[width] duration-200 ${
        open ? "w-30" : "w-12"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2  px-3 py-4"
        aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        title={open ? "Collapse" : "Expand"}
        aria-expanded={open}
      >
        <div className="inline-flex items-baseline">
          <h1 className="text-3xl font-extrabold text-white italic tracking-[-0.08em] leading-none">BCG</h1>
          <h1 className="text-3xl font-extrabold italic text-emerald-500">
            X
          </h1>
        </div>
      </button>

      <nav className={open ? "mt-2 space-y-1 mx-6" : "hidden"}>
        {NAV.map((i) => {
          return (
            <Link
              key={i.href}
              href={i.href}
              className={[
                "flex items-center  gap-3 rounded-lg px-4 py-2 text-white opacity-30 hover:opacity-100",
               
              ].join(" ")}
            >
              <span className="shrink-0">{i.icon}</span>
            </Link>
          );
        })}
      </nav>

      {open && (
        <button
          onClick={onToggle}
          className="absolute -right-3 bottom-4 grid h-7 w-7 place-items-center rounded-full border bg-white shadow"
          aria-label="Collapse sidebar"
          title="Collapse"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {!open && (
        <div
          className="absolute inset-y-0 left-0 w-full pointer-events-none"
          aria-hidden
        />
      )}
    </aside>
  );
}
