'use client'
import { IconHome, IconTransfer, IconUser } from "@tabler/icons-react";
import { Logo } from "../shared/Logo";
import { ItemSidebar } from "./ItemSideBar";

const SideBarItem = [
    {title: 'Dashboard', url: '/dashboard' ,icon: <IconHome />},
    {title: 'Contas', url: '/dashboard/contas' ,icon: <IconUser />},
    {title: 'Transações', url: '/dashboard/transacoes' ,icon: <IconTransfer />},
]

export function SideBar(){

    function renderItems(){
        return SideBarItem.map((item, index) => (
            <ItemSidebar key={index} title={item.title} url={item.url} icon={item.icon} />
        ))
    }

    return(
        <aside
            className="
            flex flex-col items-center w-64 h-screen
            overflow-y-scroll overflow-x-hidden
            scrollbar-thumb-zinc-700 scrollbar-track-zinc-800 
            scrollbar-thin
            bg-gray-950 text-white py-9 px-6">
            <Logo width={26} height={26} className="self-start"/>

            <div className="h-px w-[90%] bg-gradient-to-r from-transparent via-zinc-300 to-transparent my-5"></div>

            <nav className="w-full flex flex-col gap-2">{renderItems()}</nav>
        </aside>
    )
}