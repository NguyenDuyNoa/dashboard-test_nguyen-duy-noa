"use client";
import React, { useEffect, useState } from "react";
import CalendarDropdown from "../CalendarDropdown";
import CardProduct from "../CardProduct";
import { Product } from "@/types";
import { topProductsData } from "@/data/topProductData";

const TopProduct = () => {
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const timer = setTimeout(() => {
      setTopProducts(topProductsData);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []); 

  return (
    <div className="px-4 md:px-8 lg:px-12 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <h2 className="capitalize text-lg font-medium text-neutral-07">
          Top sản phẩm sản xuất nhiều nhất
        </h2>
        <CalendarDropdown />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {isLoading 
          ? topProductsData.map((product) => (
              <CardProduct 
                key={product.id}
                name={"Chưa có mặt hàng"}
                quantity={0}
                // percentageChange={product.percentageChange}
              />
            ))
          : topProducts.map((product) => (
              <CardProduct 
                key={product.id}
                name={product.name}
                quantity={product.quantity}
                percentageChange={product.percentageChange}
              />
            ))
        }
      </div>
    </div>
  );
};

export default TopProduct;
