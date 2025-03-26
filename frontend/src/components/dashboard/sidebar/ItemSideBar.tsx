"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ItemSidebarProps {
  title: string;
  url: string;
  icon: React.ReactElement<any>
  logout?: () => void
}

export function ItemSidebar({ title, url, icon, logout }: ItemSidebarProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  function handleClick(e: React.MouseEvent) {
    if (logout) {
      e.preventDefault()
      logout()
    }
  }

  return (
    <li>
      <Link
        onClick={handleClick}
        href={url}
        className={`w-full flex items-center gap-2 text-sm rounded-2xl px-1 py-3 transition md:w-full md-px-4
            ${isActive ? "bg-tertiary" : ""}
        `}>
        <div className={`p-1  rounded-lg ${isActive ? "bg-blue-600" : "bg-tertiary"}`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>

        <span className="block text-sm text-white font-medium">{title}</span>
      </Link>

    </li>
  )
}
