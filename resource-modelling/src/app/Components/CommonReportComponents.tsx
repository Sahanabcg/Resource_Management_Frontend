export const CustomXAxisTick = (props: {
  x?: number;
  y?: number;
  payload?: { value: string };
  index?: number;
}) => {
  const { x, y, payload, index } = props;
  const isHighlighted = index === 1;

  return (
    <g transform={`translate(${x ?? 0},${y ?? 0})`}>
      <rect
        x={-25}
        y={0}
        width={50}
        height={24}
        fill={isHighlighted ? "#10b981" : "#94a3b8"}
        rx={2}
      />
      <text
        x={0}
        y={16}
        textAnchor="middle"
        fill="white"
        fontSize={11}
        fontWeight={500}
      >
        {payload?.value}
      </text>
    </g>
  );
};

export const CustomLegend = () => {
  return (
    <div className="flex items-center justify-end gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-4 h-0.5 bg-emerald-500"></div>
        <span className="text-slate-600">Target</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-0.5 bg-pink-400"></div>
        <span className="text-slate-600">Actuals</span>
      </div>
    </div>
  );
};

export const CommonTitle = () => {
  return (
    <div>
      <div className="text-sm text-blue-600 font-medium">Resource Summary</div>
      <div className="mt-2 h-0.5 w-28 rounded bg-blue-600" />
    </div>
  );
};
