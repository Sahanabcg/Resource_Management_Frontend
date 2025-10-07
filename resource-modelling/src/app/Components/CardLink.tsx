"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CardLink({
  href,
  title,
  description,
  icon,
  className = "",
}: {
  href?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href || "#"}
      className={[
        "group block  border-2 border-emerald-400  bg-white p-6 shadow-soft hover-raise",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600",
        className,
      ].join(" ")}
    >
      <div className="px-2 h-64 flex flex-col">
        {icon && (
          <div className="mt-1 grid h-10 w-10 place-items-center rounded-xl border border-emerald-300">
            {icon}
          </div>
        )}
        <div className="py-2">
          <h3 className="font-medium text-green-700 text-lg font-sans">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        <ChevronRight
          className="mt-auto self-end opacity-60 transition-transform duration-150
               group-hover:-translate-x-0.5 group-hover:opacity-100"
          size={18}
        />
      </div>
    </Link>
  );
}
