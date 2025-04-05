import { IMAGES } from "@/constants/image";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const productionStatuses = [
  { label: "Hoàn thành", value: "completed" },
  { label: "Đang sản xuất", value: "inProgress" },
  { label: "Chưa bắt đầu", value: "notStarted" },
  { label: "Chậm tiến độ", value: "delayed" },
  { label: "Đang chờ", value: "pending" }
];

interface ProductionStatusDropdownProps {
  onStatusChange?: (status: { label: string; value: string }) => void;
  defaultStatus?: { label: string; value: string };
}

const ProductionStatusDropdown: React.FC<ProductionStatusDropdownProps> = ({ 
  onStatusChange, 
  defaultStatus = productionStatuses[0]
}) => {
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleStatusSelect = (status: { label: string; value: string }) => {
    setSelectedStatus(status);
    setIsOpen(false);
    onStatusChange && onStatusChange(status);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={toggleDropdown}
        className="h-10 w-fit flex items-center gap-2 px-3 py-2 bg-neutral-00 rounded-lg border border-neutral-02 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Image
            src={IMAGES.calendarBlank}
            alt="status"
            width={24}
            height={24}
          />
          <p className="text-sm font-normal text-neutral-07 whitespace-nowrap">
            {selectedStatus.label}
          </p>
        </div>
        <Image 
          src={IMAGES.caretDown} 
          alt="caretDown" 
          width={12} 
          height={12} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div 
          className="absolute z-10 mt-1 w-full bg-white border border-neutral-02 rounded-lg shadow-lg 
                     animate-dropdown-enter opacity-0 transform origin-top"
        >
          {productionStatuses.map((status) => (
            <div
              key={status.value}
              onClick={() => handleStatusSelect(status)}
              className="px-3 py-2 hover:bg-neutral-01 cursor-pointer text-sm font-normal text-neutral-07 
                         transition-colors duration-200 ease-in-out"
            >
              {status.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductionStatusDropdown;