"use client";
import { ProductionStatus } from "@/types";
import React, { useState, useEffect } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from "recharts";
import CalendarDropdown from "../CalendarDropdown";
import situationData from "@/data/situationData";

interface SituationProps {
  initialData?: ProductionStatus;
}

// Thêm interface mới để định nghĩa kiểu cho props của renderActiveShape
interface RenderActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: {
    name: string;
    value: number;
    color: string;
    percent: number;
  };
  index: number;
}

const Situation: React.FC<SituationProps> = ({}) => {
  const [currentData, setCurrentData] = useState<ProductionStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newData = situationData;
      setCurrentData(newData);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const defaultData = [
    {
      name: "Chưa hoàn thành",
      value: 33,
      color: "#CCCCCC",
      percent: 33,
    },
    {
      name: "Đang sản xuất",
      value: 33,
      color: "#CCCCCC",
      percent: 33,
    },
    {
      name: "Hoàn thành",
      value: 34,
      color: "#CCCCCC",
      percent: 34,
    },
  ];

  const {
    total = 0,
    notCompleted = 0,
    inProduction = 0,
    completed = 0,
  } = currentData[0] || {};

  const data =
    currentData.length === 0
      ? defaultData
      : [
          {
            name: "Chưa hoàn thành",
            value: notCompleted,
            color: "#FF8F0D",
            percent: Math.round((notCompleted / total) * 100),
          },
          {
            name: "Đang sản xuất",
            value: inProduction,
            color: "#0375F3",
            percent: Math.round((inProduction / total) * 100),
          },
          {
            name: "Hoàn thành",
            value: completed,
            color: "#1FC583",
            percent: Math.round((completed / total) * 100),
          },
        ];

  const renderActiveShape = (props: RenderActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      index,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + outerRadius * cos;
    const sy = cy + outerRadius * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 15) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const color = data[index]?.color || fill;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={color}
          cornerRadius={15}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={color}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={color} stroke="none" />
        <g>
          <rect
            x={ex + (cos >= 0 ? 1 : -1) * 12 - 20}
            y={ey - 10}
            width={40}
            height={20}
            fill={color}
            rx={10}
            ry={10}
          />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={5}
            textAnchor="middle"
            fill="white"
            fontWeight="normal"
            fontSize={16}
            style={{ padding: 20 }}
          >
            {`${payload.percent}%`}
          </text>
        </g>
      </g>
    );
  };

  return (
    <div className="flex flex-col gap-5 w-full p-6 rounded-2xl bg-neutral-00 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12),0px_0px_2px_0px_rgba(145,158,171,0.20)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="truncate capitalize text-lg font-medium text-neutral-07">
          Tình hình sản xuất
        </h2>
        <div className="flex items-center gap-2">
          <CalendarDropdown
            defaultRange={{ label: "Hôm nay", value: "today" }}
          />
        </div>
      </div>
      <div className="relative h-full xl:min-h-[322px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              innerRadius={80}
              paddingAngle={5}
              dataKey="value"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              activeShape={isLoading ? undefined : (renderActiveShape as any)}
              activeIndex={[0, 1, 2]}
              cornerRadius={15}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-semibold text-neutral-07 mb-[2px]">
            {total || 0}
          </div>
          <div className="text-base font-normal text-neutral-03">
            Lệnh sản xuất
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex-1 border border-[#DDDDE2] rounded-lg p-2 flex flex-col gap-1">
          <h3 className="text-2xl font-semibold text-orange-01">
            {notCompleted}
          </h3>
          <p className="text-sm font-normal text-neutral-07">Chưa hoàn thành</p>
        </div>
        <div className="flex-1 border border-[#DDDDE2] rounded-lg p-2 flex flex-col gap-1">
          <h3 className="text-2xl font-semibold text-light-blue">
            {inProduction}
          </h3>
          <p className="text-sm font-normal text-neutral-07">Đang sản xuất</p>
        </div>
        <div className="flex-1 border border-[#DDDDE2] rounded-lg p-2 flex flex-col gap-1">
          <h3 className="text-2xl font-semibold text-[#1FC583]">{completed}</h3>
          <p className="text-sm font-normal text-neutral-07">Hoàn thành</p>
        </div>
      </div>
    </div>
  );
};

export default Situation;
