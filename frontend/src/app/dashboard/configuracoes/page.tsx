import { SettingsInfoText } from "@/components/dashboard/SettingsInfoText";
import Link from "next/link";

export default function Page() {
    return (
            <div className="flex items-center justify-between">
                <div>
                    <nav className="flex items-center gap-14 text-lg mb-14">
                        <Link href={"/dashboard/configuracoes"}>Conta</Link>
                        <Link href={"/dashboard/configuracoes/aparencia"}>Aparência</Link>
                        <Link href={"/dashboard/configuracoes/seguranca"}>Seguranca</Link>
                    </nav>

                    <div className="flex flex-col gap-10">
                        <SettingsInfoText title="Nome" value="Gabriel Correia" />
                        <SettingsInfoText title="Email" value="Y3ZpG@example.com" />
                        <SettingsInfoText title="Senha" value="*********" />
                    </div>
                </div>

                <div className="w-56 h-52 bg-zinc-800 mr-12">

                </div>
            </div>
    )
}