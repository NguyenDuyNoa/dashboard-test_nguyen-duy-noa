"use client";

import { IMAGES } from "@/constants/image";
import Image from "next/image";
import React from "react";

interface CardProductProps {
  name: string;
  quantity: number;
  percentageChange?: number;
}

const CardProduct: React.FC<CardProductProps> = ({
  name,
  quantity,
  percentageChange,
}) => {
  return (
    <div className="flex-1 rounded-2xl p-6 flex justify-between items-start shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12),0px_0px_2px_0px_rgba(145,158,171,0.20)]">
      <div className="flex flex-col">
        <h3 className="text-3xl font-bold text-light-blue">{quantity}</h3>
        <p className="text-sm font-normal text-neutral-07">{name}</p>
      </div>
      {percentageChange !== undefined && (
        <div className="flex items-center gap-1">
          <Image 
            src={percentageChange >= 0 ? IMAGES.upGreen : IMAGES.downRed} 
            alt={percentageChange >= 0 ? "upGreen" : "downRed"} 
            width={24} 
            height={24} 
          />
          <p className="text-sm font-medium text-neutral-05">
            {Math.abs(percentageChange)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default CardProduct;
