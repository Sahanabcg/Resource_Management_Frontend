export const CommonDeviationDescription = () => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-3 py-2 text-xs text-slate-600">
      <span className="mr-1">Deviation %:</span>

      <span className="inline-flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span>&le; 0 (Low)</span>
      </span>

      <span className="inline-flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span>1–20 (Low)</span>
      </span>

      <span className="inline-flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-full bg-pink-600" />
        <span>21–50 (Medium)</span>
      </span>

      <span className="inline-flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-full bg-pink-600" />
        <span>51–80 (Medium)</span>
      </span>

      <span className="inline-flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-full bg-pink-600" />
        <span>80–100 (High)</span>
      </span>

      <span className="inline-flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-full bg-red-700" />
        <span>&gt;100 (High)</span>
      </span>
    </div>
  );
};
