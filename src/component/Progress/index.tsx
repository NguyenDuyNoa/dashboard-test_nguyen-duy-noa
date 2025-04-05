"use client";

import React, { useEffect, useState } from "react";
import progressData from "../../data/progressData";
import ProductionStatusDropdown from "../ProductionStatusDropdown";

interface ProgressItemProps {
  label: string;
  count: number;
  total?: number;
  percentage: number;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  label,
  count,
  percentage,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="font-medium text-sm text-primary1">{label}</span>
        <p className="text-sm font-semibold text-primary1">
          {count} cái{" "}
          <span className="text-secondary1 font-normal">({percentage}%)</span>
        </p>
      </div>
      <div className="h-[8px] bg-[#919EAB1F] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1FC583] rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Progress: React.FC = () => {
  const [data, setData] = useState<ProgressItemProps[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(progressData);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full p-3 xl:p-6 rounded-2xl bg-neutral-00 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12),0px_0px_2px_0px_rgba(145,158,171,0.20)]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-6">
        <h2 className="text capitalize text-lg font-medium text-neutral-07">
          Tiến độ sản xuất theo nhóm
        </h2>
        <div className="flex justify-end w-full sm:w-fit">
          <ProductionStatusDropdown
            defaultStatus={{ label: "Hoàn thành", value: "completed" }}
          />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col gap-8">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-medium text-sm text-primary1">
                  Chưa có mặt hàng
                </span>
                <p className="text-sm font-semibold text-primary1">
                  -
                </p>
              </div>
              <div className="h-[8px] bg-[#919EAB1F] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1FC583] rounded-full"
                  style={{ width: `0%` }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {data.map((item, index) => (
            <ProgressItem
              key={index}
              label={item.label}
              count={item.count}
              percentage={item.percentage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;
