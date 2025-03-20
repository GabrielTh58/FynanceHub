"use client";

import { ModalResetPassword } from "@/components/ModalResetPassword";
import { SettingsNavLink } from "@/components/SettingNavLink";
import { SettingsInfoText } from "@/components/SettingsInfoText";
import { getUser } from "@/services/userServices";
import Image from "next/image";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                if (data) setUser(data);
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="flex items-center justify-between">
            <div>
                <nav className="flex items-center gap-14 text-lg mb-14">
                    <SettingsNavLink href="/configuracoes">Conta</SettingsNavLink>
                    <SettingsNavLink href="/configuracoes/aparencia">Aparência</SettingsNavLink>
                </nav>

                <div className="flex flex-col gap-10">
                    <SettingsInfoText title="Nome" value={user?.name || "Carregando..."} />
                    <SettingsInfoText title="Email" value={user?.email || "Carregando..."} />
                    <SettingsInfoText title="Senha" value="*********" />
                </div>

                <button
                    onClick={() => setIsModalChangePasswordOpen(true)}
                    className="text-xs rounded-[5px] bg-custom-gradient py-2 px-2 mt-8"
                >
                    Modificar senha
                </button>
            </div>

            <div className="w-56 h-52 bg-custom-gradient-card mr-12">
                <Image src="/logo.png" alt="logo" width={100} height={100} className="w-full" />
            </div>

            {isModalChangePasswordOpen && (
                <ModalResetPassword setIsModalChangePasswordOpen={setIsModalChangePasswordOpen} />
            )
        }
        </div>
    )
}
