import { IconBell, IconBellRingingFilled, IconMenu2, IconX, IconUser, IconSettings } from "@tabler/icons-react"
import { useContext, useState } from "react"
import { ModalNotification } from "@/components/modals/ModalNotification"
import { MenuContext } from "@/context/MenuContext"
import { useNotifications } from "@/hooks/useNotifications"
import Link from "next/link"

export function Header() {
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)

    const { isMenuOpen, toggleMenu } = useContext(MenuContext)
    
    const hasNotifications = useNotifications()

    function handleModalClose() {
        setIsNotificationsModalOpen(false)
    }

    return (
        <header className="flex items-center justify-between w-full h-14 mb-5">
            <div className="flex items-center text-zinc-400 p-1 z-30 lg:hidden">
                <button onClick={toggleMenu} aria-label="Abrir menu de navegação">
                    {!isMenuOpen ? <IconMenu2 /> : <IconX />}
                </button>
            </div>         

            <div className="flex items-center w-full justify-end">
                <div className="flex items-center gap-4">
                    <Link href="/configuracoes">
                        <IconUser stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                    </Link>
                    <Link href="/configuracoes">
                        <IconSettings stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                    </Link>
                    <div onClick={() => setIsNotificationsModalOpen(true)}>
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
