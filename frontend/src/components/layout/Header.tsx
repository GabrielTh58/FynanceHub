'use client'

import { IconBell, IconBellRingingFilled, IconMenu2, IconSearch, IconSettings, IconUser, IconX } from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext, useEffect, useMemo, useState } from "react"
import { ModalNotification } from "@/components/Modals/ModalNotification"
import { MenuContext } from "@/context/MenuContext"

export function Header() {
    const pathname = usePathname()
    const [hasNotifications, setHasNotifications] = useState(false)
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)

    const { isMenuOpen, toggleMenu } = useContext(MenuContext)

    function handleModalClose () { 
        setIsNotificationsModalOpen(false)
    }

    useEffect(() => {
        try {
            const lastReportDate = localStorage.getItem("lastReportDate")
            const lastGeneratedReport = localStorage.getItem("lastGeneratedReport")
            const hasNewReport = localStorage.getItem("hasNewReport") === "true"

            const today = new Date()
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

            const isNewMonth = !lastReportDate || new Date(lastReportDate) < firstDayOfMonth
            const hasPendingReport = !!lastGeneratedReport && isNewMonth

            setHasNotifications(Boolean(hasNewReport || hasPendingReport))
        } catch (error) {
            console.error("Erro ao acessar localStorage:", error)
        }
    }, [])

    const formatPathname = useMemo(() => {
        const format = pathname.split("/")
        switch (format[1]) {
            case "configuracoes":
                return "configurações"
            case "":
                return "dashboard"
            case "transactions":
                return "transações"
            default:
                return format[1]
        }
    }, [pathname])

    console.log(isMenuOpen);
    
    return (
        <header className="flex item-center justify-between w-full h-14 mb-5 ">
            <div className="hidden lg:flex lg:items-center">
                <p className="capitalize">
                    <span className="text-zinc-400">Página </span>
                    / {formatPathname}
                </p>
            </div>

            <div className="flex items-center text-zinc-400 p-1 z-10 lg:hidden">
                <button
                    onClick={toggleMenu}
                    className="flex items-center text-zinc-400 p-1 lg:hidden focus:outline-none z-30"
                    aria-label="Abrir menu de navegação"
                >
                    <IconMenu2 />
                </button>
            </div>

            <div className="flex items-center ">

                <div className="flex items-center gap-4">
                    <Link href="/configuracoes">
                        <IconUser stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                    </Link>

                    <Link href="/configuracoes">
                        <IconSettings stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                    </Link>

                    <div onClick={() => { setIsNotificationsModalOpen(true) }}>
                        {hasNotifications ? (
                            <IconBellRingingFilled stroke={1} className="text-yellow-500 cursor-pointer hover:text-yellow-400" />
                        ) : (
                            <IconBell stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                        )}
                    </div>
                </div>
            </div>

            {isNotificationsModalOpen && <ModalNotification handleModalClose={handleModalClose} hasNotifications={hasNotifications} />}
        </header>

    )
}