"use client";
import { ProductPlanData, productPlanData } from "@/data/planData";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CalendarDropdown from "../CalendarDropdown";

// Định nghĩa kiểu cho props của CustomTooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    color?: string;
    value: number;
  }>;
  label?: string;
}

// Định nghĩa kiểu cho props của XAxis và YAxis tick
interface TickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
  };
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-primary text-neutral-00 px-3 py-2 rounded-lg text-sm font-medium">
        <p className="mb-1">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} cái`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Plan = () => {
  const [loading, setLoading] = useState(true);
  const [productPlan, setProductPlan] = useState<ProductPlanData[]>(
    Array(5)
      .fill(0)
      .map(() => ({ name: "-", keHoach: 0, thucHien: 0 }))
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setProductPlan(productPlanData);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-neutral-00 w-full shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12),0px_0px_2px_0px_rgba(145,158,171,0.20)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="capitalize text-lg font-medium text-neutral-07">
          Kế Hoạch Sản Xuất
        </h2>
        <CalendarDropdown
          defaultRange={{ label: "Quý này", value: "thisQuarter" }}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mb-4 px-4">
        <div className="flex items-center gap-[10px]">
          <div className="w-[27px] h-[13px] rounded-full bg-light-blue"></div>
          <span className="text-sm font-medium text-neutral-05">Kế hoạch</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="w-[27px] h-[13px] rounded-full bg-[#1FC583]"></div>
          <span className="text-sm font-medium text-neutral-05">Thực hiện</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={productPlan}
          margin={{ top: 40, right: 0, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            dy={10}
            tick={(props: TickProps) => {
              const { x, y, payload } = props;
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={10}
                    dy={4}
                    textAnchor="middle"
                    fill="#9295A4"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                </g>
              );
            }}
            label={{
              value: "Mặt hàng",
              position: "insideLeft",
              offset: -40,
              style: { textAnchor: "middle", fill: "#666", fontSize: 12 },
            }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={[0, 25, 50, 75, 100]}
            tick={(props: TickProps) => {
              const { x, y, payload } = props;
              return (
                <g transform={`translate(${x - 10},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={4}
                    textAnchor="end"
                    fill="#666"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                </g>
              );
            }}
            width={60}
            dy={30}
            label={{
              value: loading ? "Đơn vị" : "Cái",
              position: "top",
              offset: 30,
              style: { textAnchor: "", fill: "#666", fontSize: 12 },
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar
            dataKey="keHoach"
            fill="#1E88E5"
            barSize={20}
            radius={[4, 4, 0, 0]}
            name="Kế hoạch"
          ></Bar>
          <Bar
            dataKey="thucHien"
            fill="#00C853"
            barSize={20}
            radius={[4, 4, 0, 0]}
            name="Thực hiện"
          ></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Plan;
