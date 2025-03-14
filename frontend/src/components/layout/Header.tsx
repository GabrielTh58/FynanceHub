'use client'

import { IconBell, IconBellRingingFilled, IconSearch, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ModalNotification } from "@/components/ModalNotification";

export function Header() {
    const pathname = usePathname();
    const [hasNotifications, setHasNotifications] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        try {
            const lastReportDate = localStorage.getItem("lastReportDate");
            const lastGeneratedReport = localStorage.getItem("lastGeneratedReport");
            const hasNewReport = localStorage.getItem("hasNewReport") === "true";
    
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
            const isNewMonth = !lastReportDate || new Date(lastReportDate) < firstDayOfMonth;
            const hasPendingReport = !!lastGeneratedReport && isNewMonth;
    
            setHasNotifications(Boolean(hasNewReport || hasPendingReport));
        } catch (error) {
            console.error("Erro ao acessar localStorage:", error);
        }
    }, []);
    
    const formatPathname = useMemo(() => {
        const format = pathname.split("/");
        switch (format[1]) {
            case "configuracoes":
                return "configurações";
            case "":
                return "dashboard";
            case "transactions":
                return "transações";
            default:
                return format[1];
        }
    }, [pathname])

    return (
        <header className="flex item-center justify-between w-full h-14 mb-5">
            <div className="flex items-center">
                <p className="capitalize">
                    <span className="text-zinc-400">Página </span>
                    / {formatPathname}
                </p>
            </div>

            <div className="flex items-center ">
                <div className="w-40 flex items-center gap-2 mr-4 px-2 py-1 bg-tertiary rounded-2xl">
                    <IconSearch width={27} height={18} className="text-slate-700" />
                    <input type="text" placeholder="Pesquisar..." className="w-full bg-tertiary outline-none  placeholder:text-xs placeholder:font-medium" />
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/configuracoes">
                        <IconUser stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                    </Link>

                    <Link href="/configuracoes">
                        <IconSettings stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                    </Link>

                    <div onClick={() => { setIsModalOpen(true) }}>
                        {hasNotifications ? (
                            <IconBellRingingFilled stroke={1} className="text-yellow-500 cursor-pointer hover:text-yellow-400" />
                        ) : (
                            <IconBell stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && <ModalNotification setIsModalOpen={setIsModalOpen} hasNotifications={hasNotifications} />}
        </header>

    )
}