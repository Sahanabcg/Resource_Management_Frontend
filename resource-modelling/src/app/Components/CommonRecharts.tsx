import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import {
  CustomXAxisTick,
  CustomLegend,
} from "../Components/CommonReportComponents";
import { SeriesPoint, Highlight } from "@/types/resource";

type props = {
  data: SeriesPoint[];
  highlight?: Highlight;
};
export const CommonRecharts = ({ data, highlight }: props) => {
  return (
    <div className="rounded border border-slate-200 bg-white p-4">
      <CustomLegend />
      <div className="h-[320px] mt-2">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ left: 0, right: 20, top: 20, bottom: 40 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
              horizontal={true}
            />

            <XAxis
              dataKey="label"
              tick={<CustomXAxisTick />}
              height={60}
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              interval={0}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              axisLine={{ stroke: "#cbd5e1" }}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              label={{
                value: "Number of FTEs",
                angle: -90,
                position: "insideLeft",
                style: { fontSize: 12, fill: "#64748b" },
              }}
            />

            <ReferenceArea
              x1={highlight?.x1}
              x2={highlight?.x2}
              fill="#10b981"
              fillOpacity={0.25}
              stroke="none"
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
              }}
            />

            <Line
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, fill: "#10b981" }}
              activeDot={{ r: 6 }}
              name="Target"
            />

            <Line
              type="monotone"
              dataKey="actual"
              stroke="#ec4899"
              strokeWidth={2}
              dot={{ r: 4, fill: "#ec4899" }}
              activeDot={{ r: 6 }}
              name="Actuals"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-xs text-slate-500 mt-2">Timeline</div>
    </div>
  );
};
