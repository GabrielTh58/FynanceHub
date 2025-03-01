'use client'
import { IconHome, IconSettings, IconTransfer } from "@tabler/icons-react";
import { Logo } from "../shared/Logo";
import { ItemSidebar } from "./ItemSideBar";

const SideBarItem = [
    {title: 'Dashboard', url: '/' ,icon: <IconHome />},
    {title: 'Transações', url: '/transactions' ,icon: <IconTransfer />},
    {title: 'Configurações', url: '/configuracoes' ,icon: <IconSettings />},
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
            flex flex-col items-center w-72 h-screen
            overflow-y-scroll overflow-x-hidden
            scrollbar-thumb-zinc-700 scrollbar-track-zinc-800 
            scrollbar-thin
            bg-gray-950 text-white py-9 px-6">
            <Logo width={45} height={45} textSize="text-base" className="self-start"/>

            <div className="h-px w-[90%] bg-gradient-to-r from-transparent via-zinc-300 to-transparent my-5"></div>

            <nav className="w-full flex flex-col gap-2">{renderItems()}</nav>
        </aside>
    )
}