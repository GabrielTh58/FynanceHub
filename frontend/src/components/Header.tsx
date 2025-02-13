import { IconSearch, IconSettings, IconUser } from "@tabler/icons-react";

export function Header() {
    return(
        <header className="flex item-center justify-between w-full h-14 mb-5">
            <div className="flex items-center">
                <p><span className="text-zinc-400">pages</span> / Dashboard</p>
            </div>

            <div className="flex items-center ">
                <div className="flex items-center gap-2 mr-4 p-2 bg-zinc-900 rounded-lg">
                    <IconSearch />
                    <input type="text" placeholder="Pesquisar" className="outline-none bg-zinc-900"/>
                </div>

                <div className="flex items-center gap-4">
                    <IconSettings stroke={1} className="cursor-pointer" />
                    <IconUser stroke={1} className="cursor-pointer" />
                </div>
            </div>
        </header>
    )
}