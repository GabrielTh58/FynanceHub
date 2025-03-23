'use client'

import { IconHome, IconLogout, IconSettings, IconTransfer } from "@tabler/icons-react"
import { Logo } from "@/components/ui/Logo"
import { logout } from "@/services/authService"
import { useRouter } from "next/navigation"
import { ItemSidebar } from "./ItemSideBar"

export function SideBar() {
    const router = useRouter()

    async function handleLogout() {
        try {
            logout();
            router.push("/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }

    const SideBarItem = [
        { title: 'Dashboard', url: '/', icon: <IconHome /> },
        { title: 'Transações', url: '/transactions', icon: <IconTransfer /> },
        { title: 'Configurações', url: '/configuracoes', icon: <IconSettings /> },
        { title: 'Sair', url: '/login', icon: <IconLogout />, logout: handleLogout },
    ]

    function renderItems() {
        return SideBarItem.map((item, index) => (
            <ItemSidebar key={index} title={item.title} url={item.url} icon={item.icon} logout={item.logout} />
        ))
    }

    
    return (
        <aside
            className={`
            flex flex-col items-center w-72 min-h-screen overflow-x-hidden            
            sidebar-gradient text-white py-9 px-6 shadow-lg
          
        `}>
            <Logo width={45} height={45} textSize="text-base" className="self-start" />

            <div className="h-px w-[90%] bg-gradient-to-r from-transparent via-zinc-300 to-transparent my-5"></div>

            <nav className="w-full flex flex-col gap-2">{renderItems()}</nav>
        </aside>
    )
}

//< 800 tirar sidebar