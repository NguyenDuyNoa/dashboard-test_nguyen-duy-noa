import { IMAGES } from "@/constants/image";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const timeRanges = [
  { label: "Hôm nay", value: "today" },
  { label: "Tuần này", value: "thisWeek" },
  { label: "Tháng này", value: "thisMonth" },
  { label: "Quý này", value: "thisQuarter" },
  { label: "Năm này", value: "thisYear" }
];

interface CalendarDropdownProps {
  onRangeChange?: (range: { label: string; value: string }) => void;
  defaultRange?: { label: string; value: string };
}

const CalendarDropdown: React.FC<CalendarDropdownProps> = ({ 
  onRangeChange, 
  defaultRange = timeRanges[2]
}) => {
  const [selectedRange, setSelectedRange] = useState(defaultRange);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleRangeSelect = (range: { label: string; value: string }) => {
    setSelectedRange(range);
    setIsOpen(false);
    if (onRangeChange) {
      onRangeChange(range);
    }
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
    <div className="relative w-fit" ref={dropdownRef}>
      <div 
        onClick={toggleDropdown}
        className="h-10 w-fit flex items-center gap-2 px-3 py-2 bg-neutral-00 rounded-lg border border-neutral-02 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Image
            src={IMAGES.calendarBlank}
            alt="calendar"
            width={24}
            height={24}
          />
          <p className="text-sm font-normal text-neutral-07">
            {selectedRange.label}
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
          {timeRanges.map((range) => (
            <div
              key={range.value}
              onClick={() => handleRangeSelect(range)}
              className="px-3 py-2 hover:bg-neutral-01 cursor-pointer text-sm font-normal text-neutral-07 
                         transition-colors duration-200 ease-in-out"
            >
              {range.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarDropdown;
