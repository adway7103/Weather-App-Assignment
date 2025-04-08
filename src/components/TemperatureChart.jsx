// src/components/TemperatureChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";

export function TemperatureChart({ forecast }) {
  const chartData = forecast.map((day) => ({
    name: format(new Date(day.dt * 1000), "EEE"),
    date: format(new Date(day.dt * 1000), "MMM d"),
    max: Math.round(Math.max(...day.temps)),
    avg: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
    min: Math.round(Math.min(...day.temps)),
  }));

  return (
    <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 dark:text-white text-gray-800">
        7-Day Temperature Forecast
      </h2>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.2}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6b7280" }}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              unit="°"
              tick={{ fill: "#6b7280" }}
              tickMargin={10}
              axisLine={false}
              domain={["dataMin - 2", "dataMax + 2"]}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "0.5rem",
                backdropFilter: "blur(4px)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [
                `${value}°C`,
                value === "avg" ? "Average" : value === "max" ? "High" : "Low",
              ]}
              labelFormatter={(label) => {
                const day = chartData.find((d) => d.name === label);
                return day ? day.date : label;
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
              formatter={(value) => {
                if (value === "max") return "High";
                if (value === "avg") return "Average";
                if (value === "min") return "Low";
                return value;
              }}
            />
            <ReferenceLine y={0} stroke="#9ca3af" strokeOpacity={0.3} />
            <Line
              type="monotone"
              dataKey="max"
              name="High"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ef4444", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="avg"
              name="Average"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="min"
              name="Low"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Showing daily high, average, and low temperatures for the next week
        </p>
      </div>
    </div>
  );
}
