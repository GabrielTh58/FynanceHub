import { IconCode } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ItemSidebarProps {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

export function ItemSidebar({ title, url, icon }: ItemSidebarProps) {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={`w-full flex items-center gap-2 text-sm rounded-md hover:bg-slate-900 px-4 py-4 transition 
        ${isActive ? "bg-[#1a1f37]" : ""}
    `}>
      {icon ?? <IconCode />}
      {title}
    </Link>
  );
}
