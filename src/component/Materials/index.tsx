"use client";

import React, { useEffect, useState } from "react";
import CalendarDropdown from "../CalendarDropdown";
import materialsData from "@/data/materialsData";
import Image from "next/image";
import { IMAGES } from "@/constants/image";

interface Material {
  id: number;
  name: string;
  code: string;
  unit: string;
  quantity: number;
}

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMaterials(materialsData);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-2xl bg-neutral-00 w-full shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12),0px_0px_2px_0px_rgba(145,158,171,0.20)]">
      <div className="py-6 px-4 flex justify-between items-center">
        <h2 className="truncate capitalize text-lg font-medium text-neutral-07">
          Nguyên Vật Liệu Cần Mua
        </h2>
        <CalendarDropdown
          defaultRange={{ label: "Tuần này", value: "thisWeek" }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-neutral-01 h-12 border-b border-[#F3F3F4]">
            <tr>
              <th className="p-2 text-center font-semibold text-xs text-neutral-04">
                STT
              </th>
              <th className="p-2 text-left font-semibold text-xs text-neutral-04">
                Nguyên vật liệu
              </th>
              <th className="p-2 text-left font-semibold text-xs text-neutral-04">
                Đơn vị tính
              </th>
              <th className="p-2 text-center font-semibold text-xs text-neutral-04">
                Số lượng
              </th>
            </tr>
          </thead>
          {materials.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={4} className="text-center py-4">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={IMAGES.empty}
                      alt="empty"
                      width={300}
                      height={300}
                    />
                    <p className="text-sm font-medium text-neutral-04">
                      Chưa có dữ liệu
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {materials.map((material) => (
                <tr key={material.id} className="border-b border-[#F3F3F4]">
                  <td className="p-2 text-center font-semibold text-sm text-neutral-07">
                    {material.id}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
                        <Image
                          src={IMAGES.image}
                          alt="material"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-neutral-07">
                          {material.name}
                        </div>
                        <div className="text-neutral-03 font-normal text-[10px]">
                          (none)
                        </div>
                        <div className="text-[#3276FA] font-normal text-[10px]">
                          {material.code}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 font-semibold text-sm text-neutral-07">
                    {material.unit}
                  </td>
                  <td className="p-2 text-center font-semibold text-sm text-neutral-07">
                    {material.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Materials;
