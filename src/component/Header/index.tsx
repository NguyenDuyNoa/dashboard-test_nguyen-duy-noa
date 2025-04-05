"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "@/constants/image";
import Link from "next/link";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Danh mục", href: "/" },
    { label: "Bán & Xuất hàng", href: "/" },
    { label: "Mua & Nhập hàng", href: "/" },
    { label: "Kho & Sản xuất", href: "/" },
    { label: "Kế toán", href: "/" },
    { label: "Báo cáo & Thống kê", href: "/" },
    { label: "Tiện ích", href: "/" },
  ];

  return (
    <header className="z-[999] sticky top-0 h-[72px] bg-new-blue px-6 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Image src={IMAGES.logo} alt="logo" width={100} height={100} />
        <div className="hidden lg:flex items-center flex-wrap">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="px-2 py-1 text-neutral-01 text-sm font-normal whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex py-1 px-1.5 items-center gap-1 bg-white/20 rounded-lg">
          <Image src={IMAGES.search} alt="search" width={24} height={24} />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="text-xs font-light tracking-[0.4%] placeholder:text-neutral-00 focus:outline-none bg-transparent text-white"
          />
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <Image src={IMAGES.setting} alt="setting" width={24} height={24} />
          <Image src={IMAGES.change} alt="change" width={24} height={24} />
          <Image src={IMAGES.message} alt="message" width={24} height={24} />
          <Image src={IMAGES.noti} alt="noti" width={24} height={24} />
          <Image src={IMAGES.question} alt="question" width={24} height={24} />
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Image src={IMAGES.account} alt="account" width={24} height={24} />
          <Image src={IMAGES.downWhite} alt="account" width={24} height={24} />
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          className={`fixed top-[72px] left-0 right-0 bottom-0 bg-new-blue p-4 lg:hidden 
            animate-slide-down-enter overflow-y-auto`}
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="px-2 py-1 text-neutral-01 text-sm font-normal"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="py-1 px-1.5 flex items-center gap-1 bg-white/20 rounded-lg">
              <Image src={IMAGES.search} alt="search" width={24} height={24} />
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="text-xs font-light tracking-[0.4%] placeholder:text-neutral-00 focus:outline-none bg-transparent text-white"
              />
            </div>
            <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
          <Image src={IMAGES.setting} alt="setting" width={24} height={24} />
          <Image src={IMAGES.change} alt="change" width={24} height={24} />
          <Image src={IMAGES.message} alt="message" width={24} height={24} />
          <Image src={IMAGES.noti} alt="noti" width={24} height={24} />
          <Image src={IMAGES.question} alt="question" width={24} height={24} />
        </div>
        <div className="flex items-center gap-1">
          <Image src={IMAGES.account} alt="account" width={24} height={24} />
          <Image src={IMAGES.downWhite} alt="account" width={24} height={24} />
        </div>
              {/* <Image src={IMAGES.account} alt="account" width={24} height={24} />
              <span className="text-white text-sm">Tài khoản</span> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
