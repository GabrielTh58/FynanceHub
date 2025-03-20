import Link from "next/link";
import { usePathname } from "next/navigation";

interface SettingsNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function SettingsNavLink({ href, children }: SettingsNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href
  
  return (
    <Link
      href={href}
      className={`pb-2 border-b-2 transition ${
        isActive ? "border-blue-600 text-blue-600" : "border-transparent"
      }`}
    >
      {children}
    </Link>
  );
}
