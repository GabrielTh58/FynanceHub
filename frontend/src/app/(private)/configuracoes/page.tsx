"use client"

import { useEffect, useState } from "react"
import { deleteUser, getUser } from "@/services/userServices"
import { ModalConfirmation } from "@/components/ModalConfirmation"
import { ModalResetPassword } from "@/components/ModalResetPassword"
import { SettingsNavLink } from "@/components/SettingNavLink"
import { SettingsInfoText } from "@/components/SettingsInfoText"
import { ActionButton } from "@/components/shared/ActionButton"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface User {
    id: number
    name: string
    email: string
    password: string
    createdAt: Date
}

export default function Page() {
    const [user, setUser] = useState<User | null>(null)
    const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] = useState(false)
    const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser()
                if (data) setUser(data)
            } catch (error) {
                console.error("Erro ao buscar usuário:", error)
            }
        }

        fetchUser()
    }, [])

    const handleDeleteUser = async () => {
        if (!user) return

        try {
            await deleteUser(user.id)
            localStorage.removeItem("token")
            setUser(null)
            setIsModalConfirmationOpen(false)
            router.replace("/login")
        } catch (e: any) {
            console.error("Erro ao excluir usuário:", e);
        }
    }

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

                <div className="flex items-center gap-3">
                    <ActionButton onClick={() => setIsModalChangePasswordOpen(true)}>
                        Modificar senha
                    </ActionButton>

                    <ActionButton onClick={() => setIsModalConfirmationOpen(true)}>
                        Excluir Conta
                    </ActionButton>
                </div>
            </div>

            <div className="w-56 h-52 bg-custom-gradient-card mr-12">
                <Image src="/logo.png" alt="logo" width={100} height={100} className="w-full" />
            </div>

            {isModalChangePasswordOpen && (
                <ModalResetPassword setIsModalChangePasswordOpen={setIsModalChangePasswordOpen} />
            )}

            {isModalConfirmationOpen && (
                <ModalConfirmation
                    isOpen={isModalConfirmationOpen}
                    onClose={() => setIsModalConfirmationOpen(false)}
                    onConfirm={handleDeleteUser}
                    title="Tem certeza que deseja excluir sua conta?"
                    description="Esta ação não pode ser desfeita e todos os seus dados serão removidos permanentemente."
                    confirmText="Excluir"
                    cancelText="Cancelar"
                    icon
                />
            )}
        </div>
    )
}
