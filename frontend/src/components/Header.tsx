import { IconSearch, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";

export function Header() {
    return(
        <header className="flex item-center justify-between w-full h-14 mb-5">
            <div className="flex items-center">
                <p>
                    <span className="text-zinc-400">pages </span> 
                    / Dashboard
                </p>
            </div>

            <div className="flex items-center ">
                <div className="w-40 flex items-center gap-2 mr-4 px-2 py-1 bg-tertiary rounded-2xl">
                    <IconSearch width={27} height={18} className="text-slate-700" />
                    <input type="text" placeholder="Pesquisar..." className="w-full bg-tertiary outline-none  placeholder:text-xs placeholder:font-medium"/>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/configuracoes">
                        <IconUser stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />                    
                    </Link>

                    <Link href="/configuracoes">
                        <IconSettings stroke={1} className="text-slate-400 cursor-pointer hover:text-slate-300" />
                    </Link>
                </div>
            </div>
        </header>
    )
}