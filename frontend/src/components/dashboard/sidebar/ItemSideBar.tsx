"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemSidebarProps {
  title: string;
  url: string;
  icon: React.ReactNode;
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
    <ul>
      <li>
        <Link
          onClick={handleClick}
          href={url}
          className={` flex items-center gap-2 text-sm rounded-2xl px-4 py-3 transition 
            ${isActive ? "bg-tertiary" : ""}
        `}>
          <div className={`p-1 rounded-lg ${isActive ? "bg-blue-600" : "bg-tertiary"}`}>
            {icon}
          </div>

          <span className="text-sm text-white font-medium">{title}</span>
        </Link>

      </li>
    </ul>
  );
}
